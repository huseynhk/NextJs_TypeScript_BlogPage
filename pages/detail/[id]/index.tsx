import React from "react";
import { getPostID } from "../../../services/posts";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { ROUTER } from "../../../shared/constants/router";

const PostDetail: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ post }) => {
  const { push, query } = useRouter();

  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-xl ">
        <figure>
          <img
            src={post?.image}
            alt={post?.title}
            className="h-screen w-screen object-cover"
          />
        </figure>
        <div className="card-body p-6">
          <h2 className="card-title text-3xl text-sky-300">
            {post?.title.slice(0, 16)}
          </h2>
          <p className="text-xl text-sky-300 my-4">{post?.body}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-secondary text-gray-200 px-6 text-2xl"
              onClick={() => push(`${query.id}/${ROUTER.UpdatePost}`)}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const postId = context.query.id as string | number;

  try {
    const response = await getPostID(postId);
    const post = response.data;

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return {
      props: {
        post: null,
        isError: true,
      },
    };
  }
}
