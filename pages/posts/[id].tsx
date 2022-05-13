import { NextPage } from "next";
import Link from "next/link";
import Avatar from "components/avatar";
import CreatedAt from "components/created-at";
import MainLayout from "components/layouts/main-layout";
import ProductItem from "components/items/product-item";
import Region from "components/region";
import Username from "components/username";
import useSWR from "swr";
import { NextRouter, useRouter } from "next/router";
import { CommonResult } from "libs/server/withHandler";
import { Post } from ".prisma/client";
import { useEffect } from "react";
import DetailImage from "components/detail-image";
import useMutation from "libs/client/useMutation";
import { useForm } from "react-hook-form";
import useMe from "libs/client/useMe";
import DeleteButton from "components/delete-button";
import CommentItem from "components/items/comment-item";
import Image from "next/image";
import heartIcon from "public/images/heart_icon.svg";
import thumbIcon from "public/images/thumb_icon.svg";
import useSWRInfiniteClick from "libs/client/useSWRInfiniteClick";
import { Product } from ".prisma/client";
import FloatingButton from "components/floating-button";
import { RiPencilFill } from "react-icons/ri";

interface PostDetailFormData {
  text: string;
}

interface PostWithUserAndCommentsAndCount extends Post {
  user: { id: number; username: string; cloudflareImageId: string | null; address: string | null };
  postComments: { id: number; text: string; createdAt: string; user: { id: number; username: string; cloudflareImageId: string | null; address: string | null } }[];
  _count: { postComments: number; postLikes: number };
}

interface PostDetailResult extends CommonResult {
  post?: PostWithUserAndCommentsAndCount;
  isLiked: boolean;
}

interface ProductWithUserAndCount extends Product {
  user: { id: number; username: string; cloudflareImageId: string | null; address: string | null };
  _count: { productLikes: number };
}

const PostDetail: NextPage = () => {
  const me = useMe();
  const router: NextRouter = useRouter();
  const { data, mutate } = useSWR<PostDetailResult>(router.query.id && `/api/posts/${router.query.id}`);
  const infiniteData = useSWRInfiniteClick<ProductWithUserAndCount>(`/api/products`);
  const [postLikeMutation, { loading: postLikeLoading }] = useMutation<CommonResult>(`/api/posts/${router.query.id}/like`);
  const [postDeleteMutation, { data: postDeleteData, loading: postDeleteLoading }] = useMutation<CommonResult>(`/api/posts/${router.query.id}/delete`);
  const [postCommentAddMutation, { loading: postCommentAddLoading }] = useMutation<CommonResult>(`/api/posts/${router.query.id}/comment/add`);
  const [postCommentDeleteMutation, { loading: postCommentDeleteLoading }] = useMutation<CommonResult>(`/api/posts/${router.query.id}/comment/delete`);
  const { register, handleSubmit, getValues, reset } = useForm<PostDetailFormData>({ defaultValues: { text: "" } });

  const handleTogglePostLike = async () => {
    if (me === undefined) {
      return router.push("/login");
    }
    if (data === undefined || data.post === undefined) {
      return;
    }
    if (postLikeLoading === true) {
      return;
    }
    mutate(
      {
        ...data,
        post: { ...data.post, _count: { ...data.post?._count, postLikes: data.isLiked === true ? data.post?._count.postLikes - 1 : data.post?._count.postLikes + 1 } },
        isLiked: !data.isLiked,
      },
      false
    );
    postLikeMutation();
  };

  const onValid = async () => {
    if (postCommentAddLoading === true) {
      return;
    }
    const { text } = getValues();
    await postCommentAddMutation({ text });
    await mutate();
    reset();
  };

  const handleDeleteComment = async (postCommentId: number) => {
    if (postCommentDeleteLoading === true) {
      return;
    }
    await postCommentDeleteMutation({ postCommentId });
    await mutate();
  };

  const handleDeletePost = async () => {
    if (postDeleteLoading === true) {
      return;
    }
    await postDeleteMutation();
  };

  useEffect(() => {
    if (postDeleteData?.ok === true) {
      router.push("/posts");
    }
  }, [postDeleteData, router]);

  useEffect(() => {
    if (data?.ok === false) {
      router.push("/posts");
    }
  }, [data, router]);

  return (
    <MainLayout pageTitle={data?.post?.text} hasFooter={true}>
      <div className="wrapper">
        <div className="content-sub">
          {/* 동네생활 정보 */}
          <div>
            <div className="cursor-pointer">
              <DetailImage cloudflareImageId={data?.post?.cloudflareImageId} />
            </div>
            <div className="border-b pt-6 pb-5 flex items-center relative">
              <Link href={`/users/${data?.post?.user.username}/posts`}>
                <a>
                  <Avatar cloudflareImageId={data?.post?.user.cloudflareImageId} size="w-10 h-10" />
                </a>
              </Link>
              <div className="flex flex-col ml-2">
                <Link href={`/users/${data?.post?.user.username}/posts`}>
                  <a>
                    <Username text={data?.post?.user.username} size="text-[15px]" textDecoration={true} />
                  </a>
                </Link>
                <Region text={data?.post?.user.address} size="text-[13px]" />
              </div>
              {data?.post?.userId === me?.id ? <DeleteButton onClick={handleDeletePost} text="게시글 삭제" /> : null}
            </div>
            <div className="py-8">
              <p className="font-normal leading-7 text-[17px]">{data?.post?.text}</p>
              <p className="text-xs text-gray-400 space-x-1 mt-4">
                <CreatedAt date={data?.post?.createdAt} size="text-[12px]" />
              </p>
            </div>
            <div className="border-t py-3 border-gray-200">
              <div className="flex items-center mb-3 space-x-2">
                <div className="text-[17px] font-semibold">댓글 {data?.post?._count.postComments}</div>
                <div onClick={handleTogglePostLike} className="hover:bg-gray-100 p-1.5 rounded-lg  cursor-pointer flex items-center text-[17px] font-semibold">
                  <Image width={20} height={20} src={heartIcon} alt="" className="w-5 h-5" />
                  {data?.isLiked === true ? <Image width={20} height={20} src={thumbIcon} alt="" className="w-5 h-5" /> : null}
                  <span className="ml-1">{data?.post?._count.postLikes}</span>
                </div>
              </div>
              {data?.post?.postComments.map((postComment) => (
                <CommentItem
                  key={postComment.id}
                  id={postComment.id}
                  text={postComment.text}
                  createdAt={postComment.createdAt}
                  user={postComment.user}
                  me={me}
                  handleDeleteComment={() => handleDeleteComment(postComment.id)}
                />
              ))}
            </div>
          </div>

          {/* 댓글 form */}
          <form onSubmit={handleSubmit(onValid)} className="flex items-center relative border-t border-b py-6 border-gray-200">
            <div>
              <Avatar cloudflareImageId={me?.cloudflareImageId} size="w-9 h-9" />
            </div>
            <input
              {...register("text", { required: true, maxLength: 80 })}
              type="text"
              placeholder={me === undefined ? "로그인 후 댓글 입력가능합니다." : "댓글을 입력해주세요."}
              required
              maxLength={80}
              className="ml-3 w-full border pl-4 pr-16 py-1.5 rounded-full outline-none placeholder:text-gray-300 text-[15px] ring-normal"
            />
            <button
              disabled={me === undefined}
              type="submit"
              className="absolute rounded-full right-[4px] text-xs cursor-pointer px-3 py-1.5 text-white bg-orange-400 hover:bg-orange-500"
            >
              작성
            </button>
          </form>

          {/* 당근마켓 인기중고 */}
          <div>
            <div className="my-8 flex justify-between">
              <h3 className="text-lg font-semibold">당근마켓 인기 중고</h3>
              <Link href="/">
                <a className="text-orange-400 hover:text-orange-500 text-[15px]">더 구경하기</a>
              </Link>
            </div>
            <section>
              <div>
                <div className="content">
                  <div className="grid grid-cols-3 gap-x-10 gap-y-12">
                    {infiniteData.map((product) => (
                      <ProductItem
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        cloudflareImageId={product.cloudflareImageId}
                        user={product.user}
                        _count={product._count}
                        isSelling={product.isSelling}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <FloatingButton href={me ? "/posts/write" : "/login"}>
          <RiPencilFill />
        </FloatingButton>
      </div>
    </MainLayout>
  );
};

export default PostDetail;
