import React from "react";
import Image from "next/image";
import { ROUTER } from "../../constants/router";
import { useRouter } from "next/router";
import { PostDataType } from "../../../interface/data";

const Card: React.FC<PostDataType> = ({ id, title, body, image }) => {
  const { push } = useRouter();

  return (
    <>
      <div className="card bg-base-100 shadow-xl" key={id}>
        <figure className="relative h-60">
          <Image src={image} alt={title} layout="fill" objectFit="cover" />
        </figure>

        <div className="card-body bg-gray-800 p-4">
          <h2 className="card-title text-cyan-300 font-bold ">
            Title: {title.slice(0, 8)}
          </h2>
          <p className="my-3  text-gray-200">Body: {body.slice(0, 80)}...</p>
          <button
            className=" btn btn-info text-gray-600 text-2xl"
            onClick={() => push(`${ROUTER.Detail}/${id}`)}
          >
            Get Info
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
