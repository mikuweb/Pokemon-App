import React from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Image from "next/image";

const Detail = ({ name, img, height, weight, types }) => {
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
          <div className="text-4xl font-semibold mt-4 uppercase mb-2">
            {name}
          </div>
          <div className="text-2xl text-slate-700">{`# ${("000" + id).slice(
            -4
          )}`}</div>
          {/* Container */}
          <div className="flex flex-col md:flex-row">
            {/*Left Img */}
            <div className="md:w-1/2 flex items-center">
              <div className="w-60 h-60 bg-slate-200 mx-auto flex justify-center items-start rounded-lg">
                <Image src={img} alt={name} width={200} height={200} />
              </div>
            </div>
            {/*Right Contents */}
            <div className="w-full py-10 md:w-1/2 flex flex-col items-center gap-4 mx-auto ">
              <div className="bg-sky-300 w-3/4 rounded-lg py-5">
                <table className="table-auto w-2/3 mx-auto border-separate border-spacing-2">
                  <tbody className="text-start">
                    <tr>
                      <td className="text-xl font-semibold">Height</td>
                      <td className="text-xl">{`${height} cm`}</td>
                    </tr>
                    <tr>
                      <td className="text-xl font-semibold">Weight</td>
                      <td className="text-xl">{`${weight} kg`}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="w-3/4 flex flex-col justify-between">
                <span className="font-semibold text-xl mb-2">Type</span>
                <div className="flex justify-center gap-10">
                  {types.map((type) => (
                    <span
                      key={type.type.name}
                      className="bg-yellow-400 py-2 px-5 rounded-lg text-xl"
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* TEST */}

            {/* TEST */}
          </div>
        </div>
        <Button onClick={handleBack}>
          <IoIosArrowDropleftCircle />
          <span>Back to Poké list</span>
        </Button>
      </div>
    </>
  );
};

export default Detail;

//getServerSideProps: fetch poke with [id]
//<Link />をlist pageに書いてつなげる
//context params: [id]

// getServerSideProps getStaticPropsとほぼ同じ書き方
export async function getServerSideProps(context) {
  const { id } = context.query; // = const id = context.query.id;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();

  const heightCm = data.height * 10;
  const weightKg = data.weight / 10;
  return {
    props: {
      name: data.name,
      img: data.sprites.other.home.front_default,
      height: heightCm,
      weight: weightKg,
      types: data.types,
    },
  };
}

// **Don't need getStaticPaths Because of rate limiting issue.

// export async function getStaticPaths() {
//   const response = await fetch("https://pokeapi.co/api/v2/pokemon");
//   const data = await response.json();
//   const count = data.count; //1281
//   const amountOfId = Array.from(Array(count).keys());
//   const paths = amountOfId.map((entry) => ({
//     params: {
//       id: "" + entry,
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }
