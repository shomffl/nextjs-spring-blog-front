import React from "react";
import { GetStaticProps } from "next";
import { getAllPostIds, getPostById } from "../../lib/posts";

import { GetStaticPaths } from "next";
import Link from "next/link";

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
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
      <Link href={`/`}>ホームへ戻る</Link>
    </div>
  );
};

export default Show;
