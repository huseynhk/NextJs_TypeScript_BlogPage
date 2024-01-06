import React, { useState, useEffect } from "react";
import { getPostID, editPost } from "../../../services/posts";
import { QUERIES } from "../../../shared/constants/queries";
import { useQuery, useMutation } from "react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ROUTER } from "../../../shared/constants/router";
import { InitialStateType } from "../../../interface/data";

const initialState: InitialStateType = {
  title: "",
  body: "",
  image: "",
};

const EditPost = () => {
  const { push, query } = useRouter();
  const [editedPost, setEditedPost] = useState<InitialStateType>(initialState);

  const postId = query.id as string | number;

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

  const handleEditPost = async () => {
    mutation.mutate();
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
      const postData: InitialStateType = data.data;
      console.log(postData);
      setEditedPost(postData);
    }
  }, [data]);

  return (
    <div className="h-screen flex justify-center py-14">
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
          className="btn btn-accent mt-5 w-full text-xl text-gray-600"
          onClick={handleEditPost}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditPost;
