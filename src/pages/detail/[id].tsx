import Button from "@/components/Button";
import { useRouter } from "next/router";
import React from "react";

const Detail = () => {
  const router = useRouter();
  const id = router.query.id;

  const handleBack = () => {
    router.push("/list/0");
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="text-xl">Detail Page: {id}</div>
      </div>
      <div className="bg-green-100/50 flex flex-col items-center h-screen">
        {/* White Container */}
        <div className="mb-10 md:mt-14 bg-white overflow-hidden w-full md:w-9/12 md:max-w-screen-lg text-center items-center">
          <div className="text-4xl font-semibold mt-4">Pikachu</div>
          <div className="text-2xl text-slate-700 mb-4">#0025</div>
          {/* Container */}
          <div className="flex flex-col md:flex-row">
            {/*Left Img */}
            <div className="md:w-1/2 flex items-center">
              <div className="w-60 h-60 bg-slate-200 mx-auto">Img</div>
            </div>
            {/*Right Contents */}
            <div className="w-full py-10 md:w-1/2 flex flex-col items-center gap-4 mx-auto ">
              <div className="bg-sky-300 w-3/4 rounded-lg py-5">
                <table className="table-auto w-2/3 mx-auto border-separate border-spacing-2">
                  <tbody className="text-start">
                    <tr>
                      <td className="text-xl font-semibold">Height</td>
                      <td className="text-xl">40 cm</td>
                    </tr>
                    <tr>
                      <td className="text-xl font-semibold">Weight</td>
                      <td className="text-xl">6 kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <div className="w-full flex justify-around">
                  <span>Height</span>
                  <span>40 cm</span>
                </div>
                <div className="flex justify-around">
                  <span>Weight</span>
                  <span>6 kg</span>
                </div> */}

              <div className="flex flex-col justify-between">
                <span className="font-semibold text-xl mb-2">Type</span>
                <span className="bg-yellow-400 py-2 px-5 rounded-lg">
                  Electric
                </span>
              </div>
            </div>
            {/* TEST */}

            {/* TEST */}
          </div>
        </div>
        <Button onClick={handleBack}>Back to Poké list</Button>
      </div>
    </>
  );
};

export default Detail;

//getStaticProps: fetch poke with [id]
//<Link />をlist pageに書いてつなげる
//context params: [id]
