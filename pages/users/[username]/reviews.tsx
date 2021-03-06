import React from "react";
import useMe from "libs/client/useMe";
import Button from "components/button";
import prisma from "libs/server/prisma";
import Loading from "components/loading";
import Textarea from "components/textarea";
import useMutation from "libs/client/useMutation";
import MainLayout from "components/layouts/main-layout";
import UserLayout from "components/layouts/user-layout";
import ReviewItem from "components/items/review-item";
import useSWR, { useSWRConfig } from "swr";
import { useForm } from "react-hook-form";
import { Review, User } from ".prisma/client";
import { NextRouter, useRouter } from "next/router";
import { CommonResult } from "libs/server/withHandler";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from "next";

interface UserReviewsFormData {
  text: string;
  rating: number;
}

interface ReviewWithFrom extends Review {
  from: {
    id: number;
    username: string;
    cloudflareImageId: string | null;
    address: string | null;
  };
}

interface UserReviewsResult extends CommonResult {
  reviews?: ReviewWithFrom[];
}

interface UserReviewsResult extends CommonResult {
  user?: User;
}

const UserReviews: NextPage<UserReviewsResult> = ({ user }) => {
  const me = useMe();
  const router: NextRouter = useRouter();
  const { mutate: configMutate } = useSWRConfig();
  const { data, mutate } = useSWR<UserReviewsResult>(router.query.username ? `/api/users/${router.query.username}/reviews` : null);
  const [reviewAddMutation, { loading: reviewAddLoading }] = useMutation<CommonResult>(`/api/users/${router.query.username}/reviews/add`);
  const [reviewdeleteMutation, { loading: reviewDeleteLoading }] = useMutation<CommonResult>(`/api/users/${router.query.username}/reviews/delete`);
  const { register, handleSubmit, getValues, setValue, reset } = useForm<UserReviewsFormData>({ defaultValues: { rating: 3, text: "" } });

  const handleRating = (rate: number) => {
    setValue("rating", rate);
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (reviewDeleteLoading === true) {
      return;
    }
    await reviewdeleteMutation({ reviewId });
    mutate();
    configMutate(`/api/users/${router.query.username}`);
  };

  const onValid = async () => {
    if (reviewAddLoading === true) {
      return;
    }
    const { text, rating } = getValues();
    await reviewAddMutation({ text, rating });
    mutate();
    reset();
    configMutate(`/api/users/${router.query.username}`);
  };

  return (
    <MainLayout pageTitle="?????? ??????" hasFooter={true}>
      <UserLayout user={user}>
        <div className="w-[700px] max-w-[700px]">
          <div>
            {data?.reviews ? (
              <>
                {data?.reviews?.map((review) => (
                  <ReviewItem
                    key={review.id}
                    id={review.id}
                    text={review.text}
                    rating={review.rating}
                    createdAt={review.createdAt}
                    from={review.from}
                    handleDeleteReview={() => handleDeleteReview(review.id)}
                    loading={false}
                  />
                ))}
              </>
            ) : (
              <div className="flex justify-center items-center">
                <Loading color="orange" size={36} />
              </div>
            )}
          </div>

          {me && me?.username !== router.query.username ? (
            <>
              <div className="rating-container mt-12">
                <fieldset>
                  {[5, 4, 3, 2, 1].map((index) => (
                    <React.Fragment key={index}>
                      <input {...register("rating")} type="radio" value={index} id={`rate${index}`} className="hidden" />
                      <label onClick={() => handleRating(index)} htmlFor={`rate${index}`} className="text-lg text-[lightgray] hover:text-[gold] cursor-pointer">
                        ???
                      </label>
                    </React.Fragment>
                  ))}
                  <span className="text-medium text-[15px] mr-1.5 text-gray-400">.????????? ??????????????????</span>
                </fieldset>
              </div>
              <form onClick={handleSubmit(onValid)}>
                <Textarea
                  register={register("text", { required: true })}
                  rows={5}
                  maxLength={200}
                  placeholder={me === undefined ? "????????? ??? ?????????????????????." : "?????? ?????? ??????????????? ?????? ????????? ???????????????."}
                />
                <Button loading={reviewAddLoading} type="submit" text="??????" size="w-full" />
              </form>
            </>
          ) : null}
        </div>
      </UserLayout>
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const foundUser = await prisma.user.findFirst({
    where: { username: String(context.params?.username) },
  });

  return {
    props: {
      ok: true,
      message: "????????? ?????? ????????? ?????????????????????.",
      user: JSON.parse(JSON.stringify(foundUser)),
    },
    revalidate: 10,
  };
};

export default UserReviews;
