import { api } from "..";

import { IPost } from "../../interfaces";

export const getPosts: () => Promise<IPost[]> = async () => {
  try {
    const { data } = await api("/");

    return data?.posts;
  } catch (error: any) {
    console.error(error?.message);
  }
};
