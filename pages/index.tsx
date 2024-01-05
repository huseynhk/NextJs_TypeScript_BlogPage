import Head from "next/head";
import Image from "next/image";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getPosts } from "../services/posts";
import { PostDataType } from "../interface/data";
import { useRouter } from "next/router";
import { ROUTER } from "../shared/constants/router";

const Home: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ posts }) => {
  const { push } = useRouter();
  return (
    <main>
      <Head>
        <title>Blog Page</title>
      </Head>
      <ul className="p-16 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post: PostDataType) => (
          <div className="card  bg-base-100 shadow-xl" key={post.id}>
            <figure className="relative h-60">
              <Image
                src={post.image}
                alt={post.title}
                layout="fill"
                objectFit="cover"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-violet-700 font-bold ">
                Title: {post.title.slice(0, 8)}
              </h2>
              <p className="my-3  text-gray-500">
                Body: {post.body.slice(0, 50)}...
              </p>
              <button
                className="px-3 py-1 bg-violet-500 text-cyan-50 rounded-md transition-all hover:opacity-75 duration-500"
                onClick={() => push(ROUTER.Detail)}
              >
                Get Info
              </button>
            </div>
          </div>
        ))}
      </ul>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await getPosts();
    const posts: PostDataType[] = response.data;

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
