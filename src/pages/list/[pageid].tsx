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
import Link from "next/link";

export interface PokemonData {
  id: number;
  imgUrl: string;
  name: string;
  urlId: string;
}

interface PageProps {
  data: PokemonData[];
}

const Page: NextPage<PageProps> = ({ data }) => {
  const [inputvalue, setInputValue] = useState("");
  const [currentPage, setcurrentPage] = useState("0");
  const [nextPageBtn, setNextPageBtn] = useState(true);
  const [prevPageBtn, setPrevPageBtn] = useState(false);

  const router = useRouter();
  const pageId = router.query.pageId;

  const handlePrev = () => {
    if (parseInt(currentPage) > 0) {
      const prevPage = parseInt(currentPage) - 1;
      setcurrentPage(prevPage.toString());
      router.push(`/list/${prevPage}`);
    }
    if (parseInt(currentPage) == 1) {
      setPrevPageBtn(false);
    }
  };

  const handleNext = () => {
    if (parseInt(currentPage) < 64) {
      setPrevPageBtn(true);
      const nextPage = parseInt(currentPage) + 1;
      setcurrentPage(nextPage.toString());
      router.push(`/list/${nextPage}`);
    }
    if (parseInt(currentPage) == 63) {
      setNextPageBtn(false);
    }
  };

  return (
    <>
      <div className="bg-green-100/50 flex flex-col items-center min-h-screen">
        {/* CONTAINER */}
        <div className="overflow-hidden w-full md:w-9/12 md:max-w-screen-lg flex flex-col">
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

          <div className="max-w-xl md:max-w-[90%] mx-auto mt-4 h-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 md:gap-10 lg:gap-8">
            {/* CARD */}
            {data.map(({ id, imgUrl, name, urlId }) => {
              return (
                <Link key={id} href={`/detail/${urlId}`}>
                  <div className=" h-fit bg-white rounded-lg shadow-lg hover:scale-105 transition">
                    <div className="bg-slate-200 rounded-t-lg">
                      <Image src={imgUrl} alt={name} width={500} height={500} />
                    </div>

                    <div className="p-1">
                      <div>{`# ${("000" + id).slice(-4)}`}</div>
                      <div className="text-xl font-bold text-center uppercase">
                        {name}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          {/* ARROW BUTTON */}
          <div className="p-5 flex justify justify-between mb-5">
            <Button
              onClick={handlePrev}
              className="disabled:bg-slate-400 disabled:opacity-70"
              disabled={!prevPageBtn}
            >
              <IoIosArrowDropleftCircle />
              <span>Previous</span>
            </Button>
            <div className="text-xl text-blue-600 font-semibold">{parseInt(pageId as string) + 1} / 64</div>
            <Button
              onClick={handleNext}
              className="disabled:bg-slate-300"
              disabled={!nextPageBtn}
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

//getStaticPaths: Need this to pre-render with getStaticProps
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
  //const context = [{ params: { pageId: '0' } },...{ params: { pageId: '64' } }]
  const { params } = context; // = const params = context.params;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${
      parseInt(params.pageId) * 20
    }`
  );
  const pokemonArr: PokemonData[] = [];
  const data = await response.json();
  const results = data.results; //[] 20 items

   async function fetchAndPush(entry: { url: string }) {
    const result = await fetch(entry.url); //fetch(...) returns Promise<someDataType> and await fetch(...) returns someDataType
    // entry.url looks like this: "https://pokeapi.com/v2/.../10241"
    // -> Write a function that takes this string, and extracts the last number(.split)
    const extractIdFromString = (url: string) => {
      const id = url.split("/");
      return id[6];
    };
    // Then take that number and add it to the push down there
    const urlId = extractIdFromString(entry.url);
    const pokemonData = await result.json();
    pokemonArr.push({
      id: pokemonData.id,
      imgUrl: pokemonData.sprites.other.home.front_default,
      name: pokemonData.name,
      urlId: urlId,
    });
  }

  // NOT GOOD* results.forEach(async entry => await fetchAndPush(entry));
  // ** await results.asyncForEach(async ... ) doesn't exist.
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
      data: pokemonArr.sort((a, b) => {
        return a.id - b.id;
      }),
    },
  };
}
