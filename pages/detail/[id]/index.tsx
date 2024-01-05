import React from "react";
import { getPostID } from "../../../services/posts";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";


const PostDetail: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ post }) => {
  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-xl ">
        <figure>
          <img
            src={post?.image}
            alt={post?.title}
            className="h-[550px] w-screen object-cover"
          />
        </figure>
        <div className="card-body p-6">
          <h2 className="card-title text-3xl text-sky-300">
            {post?.title.slice(0, 16)}
          </h2>
          <p className="text-xl text-sky-300 my-4">{post?.body.slice(0, 80)}</p>
          <div className="card-actions justify-end">
            <button className="bg-gray-700 text-sky-200 px-5 py-2 text-2xl rounded-sm transition-all hover:opacity-75 duration-500">
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
