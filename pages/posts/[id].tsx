import React from "react";
import { GetStaticProps } from "next";
import { getAllPostIds, getPostById } from "../../lib/posts";

import { GetStaticPaths } from "next";
import Link from "next/link";
import { Layout } from "../../components/Layout";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const { data } = await getPostById(params.id);

  return {
    props: { data },
  };
};

const Show = (props: any) => {
  const { data } = props;

  return (
    <Layout>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
      <Link href={`/posts/edit/${data.id}`}>編集</Link>
      <Link href={`/`}>ホームへ戻る</Link>
    </Layout>
  );
};

export default Show;
