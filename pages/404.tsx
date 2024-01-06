import React from "react";
import Head from "next/head";

function NotFound() {
  return (
    <>
      <Head>
        <title>404 Page</title>
      </Head>
      <div className="h-screen pt-72">
        <div role="alert" className="alert alert-error">
          <span className="text-4xl">Not Found...</span>
        </div>
      </div>
    </>
  );
}

export default NotFound;
