import { PostDataType } from "../interface/data";
import { ENDPOINTS } from "../shared/constants/endpoints";
import { instanceAxios } from "../shared/helpers/instanceAxios";
import { AxiosResponse } from "axios";

type GetPostsResponse = AxiosResponse<PostDataType[]>;
type GetPostIDResponse = AxiosResponse<PostDataType>;


export const getPosts = (): Promise<GetPostsResponse> =>
  instanceAxios({ method: "GET", url: ENDPOINTS.POSTS });

export const getPostID = (id: number | string): Promise<GetPostIDResponse> =>
  instanceAxios({ method: "GET", url: ENDPOINTS.POST_ID(id) });
