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
      <Link className="underline" href={`/`}>
        ホームへ戻る
      </Link>

      <div className="px-20 py-10 flex flex-col gap-2">
        <h1 className="px-4 rounded shadow bg-white w-max">{data.title}</h1>
        <p className="px-4 rounded shadow bg-white w-max">{data.body}</p>
        <Link className="send-button" href={`/posts/edit/${data.id}`}>
          edit
        </Link>
      </div>
    </Layout>
  );
};

export default Show;
