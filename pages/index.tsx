import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getPosts } from "../services/posts";
import { PostDataType } from "../interface/data";
import Card from "../shared/components/Card";

const Home: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ posts }) => {
  return (
    <main>
      <Head>
        <title>Blog Page</title>
      </Head>

      <ul className="p-16 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts?.map((post: PostDataType) => (
          <Card {...post} />
        ))}
      </ul>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await getPosts();
    const posts = response.data;

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        posts: [],
        isError: true,
      },
    };
  }
};

export default Home;
