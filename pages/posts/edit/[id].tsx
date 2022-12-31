import React, { useState } from "react";
import { GetStaticPaths } from "next";
import { getAllPostIds, getPostById, editPost } from "../../../lib/posts";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (props: any) => {
  const { params } = props;
  const { data } = await getPostById(params.id);

  return {
    props: { data },
  };
};

const Edit = (props: any) => {
  const { data } = props;
  const router = useRouter();

  const [post, setPost] = useState<any>({
    title: data.title,
    body: data.body,
  });

  const handleSendPost = async (e: any) => {
    const response = await editPost(e, data.id, post);
    router.push(`/posts/${data.id}`);
  };

  return (
    <div>
      <form onSubmit={handleSendPost}>
        <div>
          <span>title : </span>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>
        <div>
          <span>body : </span>
          <input
            type="text"
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
          />
        </div>
        <button>send</button>
      </form>
      <Link href={`/posts/${data.id}`}>戻る</Link>
    </div>
  );
};

export default Edit;
