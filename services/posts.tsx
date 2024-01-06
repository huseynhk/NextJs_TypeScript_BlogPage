import { ENDPOINTS } from "../shared/constants/endpoints";
import { instanceAxios } from "../shared/helpers/instanceAxios";
import {
  GetPosts,
  GetSinglePost,
  AddPost,
  EditPost,
  DeletePost,
} from "../interface/data";

// Get
export const getPosts = (): GetPosts =>
  instanceAxios({ method: "GET", url: ENDPOINTS.POSTS });

// Get Single
export const getPostID: GetSinglePost = (id) => {
  return instanceAxios({ method: "GET", url: ENDPOINTS.POST_ID(id) });
};

// ADD
export const addPost: AddPost = (newPost) => {
  return instanceAxios({
    method: "POST",
    url: ENDPOINTS.POSTS,
    data: newPost,
  });
};

// EDIT
export const editPost: EditPost = (id, updatedPost) => {
  return instanceAxios({
    method: "PUT",
    url: ENDPOINTS.POST_ID(id),
    data: updatedPost,
  });
};

// DELETE
export const deletePost: DeletePost = (id) => {
  return instanceAxios({ method: "DELETE", url: ENDPOINTS.POST_ID(id) });
};
