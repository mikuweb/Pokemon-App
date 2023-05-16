import { useRouter } from "next/router";
import React from "react";

const Page = () => {
  const router = useRouter();
  const pageId = router.query.pageId;
  return (
    <>
      <h1>Display 20 Pokemon!</h1>
      <p>Page: {pageId}</p>
    </>
  );
};

export default Page;
