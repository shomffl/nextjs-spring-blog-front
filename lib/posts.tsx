import React from "react";
import axios from "axios";

//postデータの全件取得
export const getPostData = async () => {
  const allPostsData = await axios.get("http://localhost:8080/api/posts");
  return allPostsData.data;
};
