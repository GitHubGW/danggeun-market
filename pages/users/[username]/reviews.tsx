import React from "react";
import { NextPage } from "next";
import MainLayout from "components/layouts/main-layout";
import UserLayout from "components/layouts/user-layout";
import useSWR from "swr";
import { NextRouter, useRouter } from "next/router";
import { CommonResult } from "libs/server/withHandler";
import { Review } from ".prisma/client";
import Textarea from "components/textarea";
import { useForm } from "react-hook-form";
import Button from "components/button";
import ReviewItem from "components/items/review-item";
import useMutation from "libs/client/useMutation";
import useMe from "libs/client/useMe";

interface UserReviewsFormData {
  text: string;
  rating: number;
}

interface ReviewWithFrom extends Review {
  from: {
    id: number;
    username: string;
    avatarUrl: string | null;
    address: string | null;
  };
}

interface UserReviewsResult extends CommonResult {
  reviews?: ReviewWithFrom[];
}

const UserReviews: NextPage = () => {
  const me = useMe();
  const router: NextRouter = useRouter();
  const { register, handleSubmit, getValues, setValue, reset } = useForm<UserReviewsFormData>({ defaultValues: { rating: 3, text: "" } });
  const { data, mutate } = useSWR<UserReviewsResult>(router.query.username ? `/api/users/${router.query.username}/reviews` : null);
  const [reviewAddMutation, { loading: reviewAddLoading }] = useMutation<CommonResult>(`/api/users/${router.query.username}/reviews/add`);
  const [reviewdeleteMutation, { loading: reviewDeleteLoading }] = useMutation<CommonResult>(`/api/users/${router.query.username}/reviews/delete`);

  const handleRating = (rate: number) => {
    setValue("rating", rate);
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (reviewDeleteLoading === true) {
      return;
    }
    await reviewdeleteMutation({ reviewId });
    await mutate();
  };

  const onValid = async () => {
    if (reviewAddLoading === true) {
      return;
    }
    const { text, rating } = getValues();
    await reviewAddMutation({ text, rating });
    await mutate();
    reset();
  };

  return (
    <MainLayout pageTitle="거래 후기" hasFooter={true}>
      <UserLayout>
        <div className="w-[700px] max-w-[700px]">
          <div>
            {data?.reviews?.map((review) => (
              <ReviewItem key={review.id} {...review} handleDeleteReview={() => handleDeleteReview(review.id)} />
            ))}
          </div>

          {me?.username !== router.query.username ? (
            <>
              <div className="rating-container mt-8">
                <fieldset>
                  {[5, 4, 3, 2, 1].map((index) => (
                    <React.Fragment key={index}>
                      <input {...register("rating")} type="radio" value={index} id={`rate${index}`} className="hidden" />
                      <label onClick={() => handleRating(index)} htmlFor={`rate${index}`} className="text-xl text-[lightgray] hover:text-[gold] cursor-pointer">
                        ★
                      </label>
                    </React.Fragment>
                  ))}
                  <span className="text-medium text-base mr-1.5 text-gray-400">.평점을 선택해주세요</span>
                </fieldset>
              </div>
              <form onClick={handleSubmit(onValid)}>
                <Textarea register={register("text", { required: true })} rows={5} maxLength={200} placeholder="거래 후에 상대방에게 감사 인사를 남겨보세요." />
                <Button loading={false} type="submit" text="작성" size="w-full" />
              </form>
            </>
          ) : null}
        </div>
      </UserLayout>
    </MainLayout>
  );
};

export default UserReviews;
