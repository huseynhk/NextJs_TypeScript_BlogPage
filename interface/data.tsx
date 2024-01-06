import { AxiosPromise } from "axios";

export interface PostDataType {
  id: number | string;
  title: string;
  body: string;
  image: string;
}
export interface InitialStateType extends Omit<PostDataType, "id"> {}

// Get
export interface GetPosts extends AxiosPromise<PostDataType[]> {}

// Get Single
export interface GetSinglePost {
  (id: number | string): AxiosPromise<PostDataType>;
}

export interface AddPost {
  (newPost: InitialStateType): AxiosPromise<PostDataType>;
}

export interface DeletePost {
  (id: number | string): AxiosPromise<void>;
}

export interface EditPost {
  (
    productId: number | string,
    updatedProduct: Partial<InitialStateType>
  ): AxiosPromise<PostDataType>;
}

export interface RouterTypes {
  Home: string;
  AddPost: string;
  UpdatePost: string;
  Detail: string;
}
