import React, { useEffect, useState } from "react";
import { GetStaticPaths } from "next";
import { getAllPostIds, getPostById, editPost } from "../../../lib/posts";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Layout } from "../../../components/Layout";
import { useForm } from "react-hook-form";

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

type Input = { title: string; body: string };

const Edit = (props: any) => {
  const { data } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({ defaultValues: { title: data.title, body: data.body } });

  const router = useRouter();

  const onsubmit = async (post: Input) => {
    try {
      const response = await editPost(data.id, post);
      router.push(`/posts/${data.id}`);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Link className="underline" href={`/posts/${data.id}`}>
        戻る
      </Link>

      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="mx-32 mt-10 px-10 bg-white rounded-md shadow-md">
          <div className="flex gap-1 pt-10">
            <span>title：&nbsp;&nbsp;</span>
            <input
              className="w-full border border-black rounded"
              {...register("title", { required: "titleを入力してください" })}
            />
          </div>
          <p className="text-red-600 font-bold">{errors.title?.message}</p>
          <div className="flex gap-1 pt-5">
            <span>body：</span>
            <textarea
              className="w-full border border-black rounded"
              {...register("body", { required: "bodyを入力してください" })}
            ></textarea>
          </div>
          <p className="text-red-600 font-bold">{errors.body?.message}</p>
          <div className="pt-10 pb-5">
            <button className="send-button">send</button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Edit;
