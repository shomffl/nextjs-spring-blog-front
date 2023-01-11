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
      <Link className="underline" href={`/`}>
        ホームへ戻る
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

export default Create;
