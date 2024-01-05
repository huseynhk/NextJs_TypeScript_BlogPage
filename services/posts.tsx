import { PostDataType } from "../interface/data";
import { ENDPOINTS } from "../shared/constants/endpoints";
import { instanceAxios } from "../shared/helpers/instanceAxios";
import { AxiosResponse } from "axios";

export const getPosts = (): Promise<AxiosResponse<PostDataType[]>> =>
  instanceAxios({ method: "GET", url: ENDPOINTS.POSTS });
