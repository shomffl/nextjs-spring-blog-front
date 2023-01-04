import React, { useState } from "react";
import Link from "next/link";
import { sendPost } from "../../lib/posts";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";

const Create = () => {
  const [post, setPost] = useState<any>({
    title: "",
    body: "",
  });

  const router = useRouter();

  const handleSendPost = async (e: any) => {
    try {
      const response = await sendPost(e, post);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSendPost}>
        <div>
          <span>title : </span>
          <input
            type="text"
            onChange={(e) => {
              setPost({ ...post, title: e.target.value });
            }}
          />
        </div>
        <div>
          <span>body : </span>
          <input
            type="text"
            onChange={(e) => setPost({ ...post, body: e.target.value })}
          />
        </div>
        <button>send</button>
      </form>
      <Link href={`/`}>ホームへ戻る</Link>
    </Layout>
  );
};

export default Create;
