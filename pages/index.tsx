import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getPosts } from "../services/posts";
import { PostDataType } from "../interface/data";
import Card from "../shared/components/Card";


const Home: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ posts }) => {

  
  return (
    <main className="h-screen">
      <Head>
        <title>Blog Page</title>
      </Head>

      {posts && posts.length > 0 ? (
        <ul className="p-20 grid gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: PostDataType) => (
            <Card {...post} key={post.id} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-5xl pt-60 text-gray-500 capitalize font-extrabold">
          no posts available
        </p>
      )}
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
