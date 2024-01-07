import React from "react";
import Image from "next/image";
import moment from "moment";
import { ROUTER } from "../../constants/router";
import { useRouter } from "next/router";
import { PostDataType } from "../../../interface/data";

const Card: React.FC<PostDataType> = ({
  id,
  title,
  body,
  image,
  create_at,
}) => {
  const { push } = useRouter();

  return (
    <>
      <div className="card bg-base-100 shadow-xl" key={id}>
        <figure className="relative h-60">
          <Image src={image} alt={title} layout="fill" objectFit="cover" />
        </figure>

        <div className="card-body bg-gray-800 p-4">
          <div className="flex items-center justify-between px-1">
            <span className="card-title text-cyan-300 font-semibold ">
              Title: {title.slice(0, 15)}
            </span>
            <span className="text-sm text-gray-400">
              {moment(create_at).fromNow()}
            </span>
          </div>
          <p className="my-3 px-1 leading-8 text-gray-300">
            Body: {body.slice(0, 75)}...
          </p>
          <button
            className=" btn btn-info text-gray-800 text-2xl"
            onClick={() => push(`${ROUTER.DetailPost}/${id}`)}
          >
            Get Info
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
