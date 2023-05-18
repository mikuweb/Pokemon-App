import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";

import Button from "@/components/Button";
import { HiMagnifyingGlass } from "react-icons/hi2";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

export interface PokemonData {
  id: number;
  imgUrl: string;
  name: string;
}

interface PageProps {
  data: PokemonData[];
}

const Page: NextPage<PageProps> = ({ data }) => {
  const [inputvalue, setInputValue] = useState("");
  const [currentPage, setcurrentPage] = useState("0");
  const [nextPage, setNextPage] = useState(true);
  const [prevPage, setPrevPage] = useState(false);
  // TODO DISABLED & STYLE
  const router = useRouter();
  const pageId = router.query.pageId;

  const handlePrev = () => {
    if (parseInt(currentPage) > 0) {
      const prevPage = parseInt(currentPage) - 1;
      setcurrentPage(prevPage.toString());
      router.push(`/list/${prevPage}`);
    } else {
      setPrevPage(false);
    }
  };
  const handleNext = () => {
    if (parseInt(currentPage) < 64) {
      setPrevPage(true);
      const nextPage = parseInt(currentPage) + 1;
      setcurrentPage(nextPage.toString());
      router.push(`/list/${nextPage}`);
    } else {
      setNextPage(false);
    }
  };

  // const num = data.id;
  // const ret = ( '000' + num ).slice( -4 );

  return (
    <>
      <div className="flex flex-col">
        <div className="text-xl">Pokémon Page: {pageId}</div>
      </div>

      <div className="bg-green-100/50 flex flex-col items-center min-h-screen">
        {/* CONTEINER */}
        <div className="border-2 overflow-hidden w-full md:w-9/12 md:max-w-screen-lg flex flex-col">
          {/* INPUT FORM */}
          <form className="my-4 pr-3 w-10/12 h-16 mx-auto flex gap-3 justify-center items-center bg-white rounded-xl">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-5">
                <HiMagnifyingGlass size={20} color="#64748b" />
              </span>
            </label>
            <input
              className="h-12 pl-10 w-full rounded-xl bg-slate-200 px-3 focus:outline-blue-900 focus:outline-8"
              placeholder="Pokémon name or keywords..."
              value={inputvalue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <button className="h-12 px-3 bg-blue-950 rounded-xl text-white hover:opacity-70">
              Search
            </button>
          </form>
          {/* CARD CONTAINER */}
          <div className="border-2 max-w-xl md:max-w-full mx-auto mt-4 h-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 md:gap-10 lg:gap-8">
            {/* CARD */}
            {data.map((pokemon) => {
              return (
                <div key={pokemon.id} className=" h-fit bg-white rounded-lg p-">
                  <div className="bg-slate-200 rounded-t-lg">
                    <Image
                      src={pokemon.imgUrl}
                      alt={pokemon.name}
                      width={500}
                      height={500}
                    />
                  </div>

                  <div className="py-1">
                    <div>{`# ${("000" + pokemon.id).slice(-4)}`}</div>
                    <div className="text-xl font-bold text-center">
                      {pokemon.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* ARROW BUTTON */}
          <div className="p-5 flex justify justify-between">
            <Button
              onClick={handlePrev}
              className="disabled:bg-slate-400 disabled:opacity-70"
              disabled={!prevPage}
            >
              <IoIosArrowDropleftCircle />
              <span>Previous</span>
            </Button>

            <Button
              onClick={handleNext}
              className="disabled:bg-slate-300"
              disabled={!nextPage}
            >
              <span>Next</span>
              <IoIosArrowDroprightCircle />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

//getStaticPaths
export async function getStaticPaths() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await response.json();
  const count = data.count;
  const amountPages = Math.ceil(count / data.results.length); // ==>65 pages (20 / 1281 = 64.05)
  const pages = Array.from(Array(amountPages).keys()); // ==>[0, 1, 2,....64]
  const paths = pages.map((p) => ({
    params: { pageId: "" + p }, // [{ params: { pageId: '0' } },...{ params: { pageId: '64' } }]
  }));
  return {
    paths,
    fallback: false,
  };
}

// Static Site Generation
export async function getStaticProps(context: { params: any }) {
  //const context = // [{ params: { pageId: '0' } },...{ params: { pageId: '64' } }]
  const { params } = context; // == const params = context.params;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20offset=${
      parseInt(params.pageId) * 20
    }`
  );
  const pokemonArr: PokemonData[] = [];
  const data = await response.json();
  const results = data.results; //[] 20 items

  async function fetchAndPush(entry: { url: string }) {
    const result = await fetch(entry.url); //fetch(...) returns Promise<someDataType> and await fetch(...) returns someDataType
    const pokemonData = await result.json();

    pokemonArr.push({
      id: pokemonData.id,
      imgUrl: pokemonData.sprites.other.home.front_default,
      name: pokemonData.name,
    });
  }

  // results.forEach(async entry => await fetchAndPush(entry)); [1,2,3].map(...) => [2,5,9]
  // await results.asyncForEach(async ... ) doesn't exist.
  await Promise.all(
    results.map(async (entry: any) => await fetchAndPush(entry))
  );
  // is the same as
  // await fetchAndPush(results[0])
  // await fetchAndPush(results[1])
  // await fetchAndPush(results[2])
  // await fetchAndPush(results[...])
  // await fetchAndPush(results[19])

  return {
    props: {
      data: pokemonArr,
    },
  };
}
