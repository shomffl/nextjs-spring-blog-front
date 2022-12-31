import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { GetStaticProps, GetServerSideProps } from "next";
import { deletePost, getPostData } from "../lib/posts";
import Link from "next/link";
import Router, { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await getPostData();

  return {
    props: {
      data,
    },
  };
};

export default function Home(props: any) {
  const { data } = props;
  const router = useRouter();

  const handleDeletePost = async (id: any) => {
    await deletePost(id);
    await router.reload();
  };

  return (
    <>
      <div>
        <Link href="/posts/create">CREATE</Link>
        {data.map(({ id, title, body }: any) => (
          <div key={id}>
            <Link href={`posts/${id}`}>
              <h1>{title}</h1>
            </Link>
            <p>{body}</p>
            <button onClick={() => handleDeletePost(id)}>削除</button>
          </div>
        ))}
      </div>
    </>
  );
}
