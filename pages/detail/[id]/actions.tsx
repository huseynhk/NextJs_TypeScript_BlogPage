import React, { useState, useEffect } from "react";
import { getPostID, editPost, deletePost } from "../../../services/posts";
import { QUERIES } from "../../../shared/constants/queries";
import { useQuery, useMutation } from "react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ROUTER } from "../../../shared/constants/router";
import { InitialStateType } from "../../../interface/data";
import DeletePost from "../../DeletePost";
import { useQueryClient } from "react-query";
import Head from "next/head";


const initialState: InitialStateType = {
  title: "",
  body: "",
  image: "",
};

const ActionPost = () => {
  const { push, query } = useRouter();
  const [editedPost, setEditedPost] = useState<InitialStateType>(initialState);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const postId = query.id as string | number;
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERIES.SinglePost, postId],
    queryFn: () => getPostID(postId),
  });

  const mutation = useMutation(() => editPost(postId, editedPost), {
    onSuccess: () => {
      setEditedPost(initialState);
      toast.success("Post updated successfully!", {
        autoClose: 1000,
      });
      setTimeout(() => {
        push(ROUTER.Home);
      }, 1500);
    },
    onError: (error) => {
      console.error("Error updating post:", error);
      toast.error("Error updating post", {
        autoClose: 1000,
      });
    },
  });

  const deleteMutation = useMutation(() => deletePost(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERIES.SinglePost, postId]);
      closeDeleteModal();
      toast.success("Post deleted successfully!", {
        autoClose: 1000,
      });
      setTimeout(() => {
        push(ROUTER.Home);
      }, 1500);
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
      toast.error("Error deleting post", {
        autoClose: 1000,
      });
    },
  });

  const handleEditPost = async () => {
    mutation.mutate();
  };

  const handleDeletePost = async () => {
    deleteMutation.mutate();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedPost((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (data) {
      setEditedPost(data.data);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Action Page</title>
      </Head>
      <div className="h-screen flex justify-center py-10">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading post</p>}
        <div>
          <h1 className="mb-7 text-4xl text-accent text-center">Update Post</h1>

          <div>
            <div>
              <input
                className="input input-bordered join-item w-80 px-4"
                placeholder="Title"
                name="title"
                value={editedPost.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="my-5">
              <input
                className="input input-bordered join-item w-80 px-4"
                placeholder="Body"
                name="body"
                value={editedPost.body}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                className="input input-bordered join-item w-80 px-4"
                placeholder="ImageUrl"
                name="image"
                value={editedPost.image}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button
            className="btn btn-accent mt-5 w-full text-xl text-gray-800"
            onClick={handleEditPost}
          >
            {mutation.isLoading ? "Updating Post..." : "Update Post"}
          </button>

          <h1 className="pt-20 text-4xl text-error text-center">Delete Post</h1>
          <button
            className="btn btn-error mt-3 w-full text-xl text-gray-800"
            onClick={openDeleteModal}
          >
            {mutation.isLoading ? "Deleting Post..." : "Delete Post"}
          </button>

          <DeletePost
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModal}
            onDelete={handleDeletePost}
          />
        </div>
      </div>
    </>
  );
};

export default ActionPost;
