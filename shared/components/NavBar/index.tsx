import Link from "next/link";
import { ActiveLink } from "../../utils/index";
import { useRouter } from "next/router";
import { ROUTER } from "../../constants/router";

const NavBar: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <div className="p-4 bg-gray-800 text-gray-200 text-xl font-poppins capitalize">
      <div className="flex justify-center items-center">
        <span className="  hover:text-blue-400 transition duration-500 text-4xl">
          <Link
            href={ROUTER.Home}
            className={
              ActiveLink(ROUTER.Home, pathname)
                ? " text-sky-300 hover:text-sky-400 transition duration-500"
                : " text-gray-400   hover:text-sky-300 transition duration-500"
            }
          >
            Blogs
          </Link>
        </span>
        <span className=" hover:text-blue-400 transition duration-500 text-4xl ml-4">
          <Link
            href={ROUTER.AddPost}
            className={
              ActiveLink(ROUTER.AddPost, pathname)
                ? " text-sky-300 hover:text-sky-400 transition duration-500"
                : " text-gray-400   hover:text-sky-300 transition duration-500"
            }
          >
            Add
          </Link>
        </span>
      </div>
    </div>
  );
};

export default NavBar;
