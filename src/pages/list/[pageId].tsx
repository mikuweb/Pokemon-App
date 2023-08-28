import React, { useEffect, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "@/components/Button";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import { HiMagnifyingGlass } from "react-icons/hi2";
import Link from "next/link";
import Head from "next/head";
import pokemonList from "../../../pokemon.json";
import pokemonDetail from "../../../pokemonDetail.json";
import useDebounce from "@/hooks/useDebounce";

export interface PokemonData {
  id: number;
  img: string | null;
  name: string;
  index: number;
}

interface PageProps {
  data: PokemonData[];
}

const Page: NextPage<PageProps> = ({ data }) => {
  const [currentPage, setcurrentPage] = useState("0");
  const [nextPageBtn, setNextPageBtn] = useState(true);
  const [prevPageBtn, setPrevPageBtn] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [filteredList, setFilteredList] = useState(data);

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

  const filterBySearch = () => {
    let updatedList = [...data];
    updatedList = updatedList.filter(
      (pokemon) =>
        pokemon.name
          .toLocaleLowerCase()
          .indexOf(inputValue.toLocaleLowerCase()) !== -1
    );
    setFilteredList(updatedList);
  };

  const debounceHandleSearch = useDebounce({
    callback: filterBySearch,
  });

  useEffect(() => {
    debounceHandleSearch();
  }, [inputValue]);

  return (
    <>
      <Head>
        <title>Pokémon App | Pokémon list</title>
      </Head>
      <div className="bg-green-100/50 text-slate-700 flex flex-col items-center min-h-screen">
        {/* CONTAINER */}
        <div className="overflow-hidden w-full md:w-9/12 md:max-w-screen-lg flex flex-col">
          <h1 className="my-4 font-bold text-3xl md:text-4xl">Pokémon List</h1>
          {/* Search INPUT FORM */}
          <form className="my-4 pr-3 w-10/12 h-16 mx-auto flex gap-3 justify-center items-center bg-white rounded-xl">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-5">
                <HiMagnifyingGlass size={20} color="#64748b" />
              </span>
            </label>
            <input
              className="h-12 pl-10 w-full rounded-xl bg-slate-200 px-3 focus:outline-blue-900 focus:outline-8"
              placeholder="Search Pokémon name..."
              onChange={(e) => setInputValue(e.target.value)}
            />
            {/* <button className="h-12 px-3 bg-blue-950 rounded-xl text-white hover:opacity-70">
              Search
            </button> */}
          </form>

          {/* CARD CONTAINER */}
          <div className="max-w-xl md:max-w-[90%] mx-auto mt-4 h-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 md:gap-10 lg:gap-8">
            {/* CARD */}
            {filteredList.map(({ id, img, name, index }) => {
              return (
                <Link key={id} href={`/detail/${index}`}>
                  <div className=" h-fit bg-white rounded-lg shadow-lg hover:scale-105 transition">
                    <div className="bg-slate-200 rounded-t-lg">
                      {img ? (
                        <Image src={img} alt={name} width={500} height={500} />
                      ) : (
                        "No Image"
                      )}
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
            <div className="text-xl text-blue-600 font-semibold">
              {parseInt(pageId as string) + 1} / 64
            </div>
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
export const getStaticPaths = async () => {
  const count = 50; //Each page has 50 Pokemon
  const amountPages = Math.ceil(pokemonList.length / count); // 26 pages (50 / 1281 = 25.62)
  const pages = Array.from(Array(amountPages).keys()); // [0, 1, 2,....25]
  const paths = pages.map((p) => ({
    params: { pageId: "" + p }, // [{ params: { pageId: '0' } },...{ params: { pageId: '25' } }]
  }));
  return {
    paths,
    fallback: false,
  };
};

// Static Site Generation
export const getStaticProps: GetStaticProps<PageProps> = async (context: {
  params?: { pageId?: string };
}) => {
  const { params } = context; // = const params = context.params;
  const offset = parseInt(params?.pageId ?? "0");
  const pokemonArr = pokemonDetail
    .slice(
      offset * 50, // 0  //  50 // 100
      (offset + 1) * 50 // 50 // 100 // 150
    )
    .map((pokemon, idx) => ({
      name: pokemon.name,
      id: pokemon.id,
      img: pokemon.img,
      index: offset * 50 + idx, // the position of that specific pokemon in pokemonDetail between 0 and 1280
    }));
  return {
    props: {
      data: pokemonArr,
    },
  };
};
