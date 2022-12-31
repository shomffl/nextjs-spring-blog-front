import React, { useState } from "react";
import Link from "next/link";
import { sendPost } from "../../lib/posts";
import { useRouter } from "next/router";

const Create = () => {
  const [post, setPost] = useState<any>({
    title: "",
    body: "",
  });
  const router = useRouter();

  const handleSendPost = async (e: any) => {
    const response = await sendPost(e, post);

    console.log(response);

    router.push("/");
  };

  return (
    <div>
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
    </div>
  );
};

export default Create;
