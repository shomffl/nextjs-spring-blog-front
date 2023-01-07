import React from "react";
import Link from "next/link";
import { sendPost } from "../../lib/posts";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { useForm } from "react-hook-form";

type Input = { title: string; body: string };

const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const router = useRouter();

  const onsubmit = async (data: Input) => {
    try {
      const response = await sendPost(data);
      router.push("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div>
          <span>title : </span>
          <input
            {...register("title", { required: "titleを入力してください" })}
          />
          <p>{errors.title?.message}</p>
        </div>
        <div>
          <span>body : </span>
          <input
            {...register("body", { required: "bodyを入力してください" })}
          />
          <p>{errors.body?.message}</p>
        </div>
        <button>send</button>
      </form>
      <Link href={`/`}>ホームへ戻る</Link>
    </Layout>
  );
};

export default Create;
