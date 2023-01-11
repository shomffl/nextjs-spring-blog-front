import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { GetStaticProps, GetServerSideProps } from "next";
import { deletePost, getPostData } from "../lib/posts";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { Layout } from "../components/Layout";

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
    <Layout>
      <Link href="/posts/create">CREATE</Link>
      <div className="grid grid-cols-4 gap-4">
        {data.map(({ id, title, body }: any) => (
          <div
            key={id}
            className="px-4 pb-4 rounded-xl shadow-md border border-gray-300 bg-white"
          >
            <button
              className="pt-2 flex ml-auto"
              onClick={() => handleDeletePost(id)}
            >
              ×
            </button>
            <Link href={`posts/${id}`}>
              <h2>{title}</h2>
            </Link>
            <p className="text-sm">{body}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
