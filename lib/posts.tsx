import React from "react";
import axios from "axios";

const API_URL = "http://localhost:8080";

//postデータの全件取得
export const getPostData = async () => {
  const allPostsData = await axios.get(`${API_URL}/api/posts`);
  return allPostsData;
};

//postデータ取得処理（id別）
export const getPostById = async (id: any) => {
  const postData = await axios.get(`${API_URL}/api/posts/${id}`);
  return postData;
};

export const getAllPostIds = async () => {
  const postData = await axios.get(`${API_URL}/api/posts`);
  return postData.data.map(({ id }: any) => {
    return {
      params: {
        id: String(id),
      },
    };
  });
};
