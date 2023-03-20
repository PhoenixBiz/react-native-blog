import { api } from "..";
import { PostPage } from "../../interfaces";

export const getSinglePost: (id: string) => Promise<PostPage> = async (id) => {
  try {
    const { data } = await api(`/post/${id}`);
    return data;
  } catch (error: any) {
    console.error(error?.message);
    return {};
  }
};
