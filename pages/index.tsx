import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { GetStaticProps } from "next";
import { getPostData } from "../lib/posts";

const inter = Inter({ subsets: ["latin"] });

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getPostData();

  return {
    props: {
      allPostsData,
    },
  };
};

export default function Home(props: any) {
  const { allPostsData } = props;

  return (
    <>
      <div>
        {allPostsData.map(({ id, title, body }: any) => (
          <div key={id}>
            <h1>{title}</h1>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </>
  );
}
