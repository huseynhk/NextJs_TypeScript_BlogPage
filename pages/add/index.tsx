import React, { useState } from "react";
import Head from "next/head";
import Layout from "@/shared/components/Layout";
import { addPost } from "../../services/posts";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ROUTER } from "../../shared/constants/router";
import { InitialStateType } from "../../interface/data";
import moment from "moment";

const createDate = moment().valueOf();
const initialState: InitialStateType = {
  title: "",
  body: "",
  image: "",
  create_at: createDate,
};

const AddPost = () => {
  const { push } = useRouter();
  const [newPost, setNewPost] = useState<InitialStateType>(initialState);

  const mutation = useMutation(() => addPost(newPost), {
    onSuccess: () => {
      setNewPost(initialState);
      toast.success("Post added successfully!", {
        autoClose: 1000,
      });
      setTimeout(() => {
        push(ROUTER.Home);
      }, 1500);
    },
    onError: (error) => {
      console.error("Error added post:", error);
      toast.error("Error added post", {
        autoClose: 1000,
      });
    },
  });

  const isFormValid = (): boolean => {
    return Object.values(newPost).every((value) => value !== "");
  };

  const handleAddPost = async () => {
    mutation.mutate();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewPost((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <>
      <Head>
        <title>Add Page</title>
      </Head>
      <Layout>
        <div className="flex justify-center py-14">
          <div>
            <h1 className="mb-7 text-4xl text-accent text-center">Add Post</h1>
            <div>
              <div>
                <input
                  className="input input-bordered join-item w-80 px-4"
                  placeholder="Title"
                  name="title"
                  value={newPost.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="my-5">
                <input
                  className="input input-bordered join-item w-80 px-4"
                  placeholder="Body"
                  name="body"
                  value={newPost.body}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  className="input input-bordered join-item w-80 px-4"
                  placeholder="ImageUrl"
                  name="image"
                  value={newPost.image}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button
              className="btn btn-accent mt-5 w-full text-xl text-gray-800"
              onClick={handleAddPost}
              disabled={!isFormValid()}
            >
              {mutation.isLoading ? "Adding Post..." : "Add Post"}
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AddPost;
