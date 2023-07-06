import axios from "axios";
import { IPost } from "../interfaces/post.interface";

export const getPosts = async (): Promise<IPost[]> => {
  const res = await axios.get("/api/posts");
  return res.data;
};

export const createPost = async (payload: IPost): Promise<IPost> => {
  const res = await axios.post("/api/posts", payload);
  return res.data;
};

export const deletePost = async (postId: number): Promise<{}> => {
  const res = await axios.delete(`/api/posts/${postId}`);
  return res.data;
};

export const updatePost = async (payload: Partial<IPost>): Promise<IPost> => {
  const res = await axios.put(`/api/posts/${payload.id}`, payload);
  return res.data;
};

export const getPostDetail = async (postId: number): Promise<IPost> => {
  const res = await axios.get(`/api/posts/${postId}`);
  return res.data;
};
