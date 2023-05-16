import React, { useState }  from "react";;
import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";

import Button from "@/components/Button"
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
  pokemonArr: PokemonData[];
}


const Page:NextPage<PageProps> = ({data}) => {
  const router = useRouter();
  const pageId = router.query.pageId;
  return (
    <div className="flex flex-col">
      <div className="text-xl">20 Pokémon (Page: {pageId})</div>
    </div>
  );
};

export default Page;

//getStaticPaths
export async function getStaticPaths() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await response.json();
  const count = data.count;
  const amountPages = Math.ceil(count / data.results.length); // ==>65 pages(20 / 1281 = 64.05)
  const pages = Array.from(Array(amountPages).keys());
  const paths = pages.map((p) => ({
    params: { pageId: "" + p},
  }));

  return {
    paths,
    fallback: false,
  };
}

// Static Generation
export async function getStaticProps(context: {
  pageId: number;
  limit: number;
}) {

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20offset=${
      context.pageId * 20
    }`
  );

  const pokemonArr: PokemonData[] = [];

  const data = await response.json();
  const results = data.results; //[] 20 items
  results.forEach(async (entry: { url: string }) => {
    const result = await fetch(entry.url);
    const pokemonData = await result.json();
    pokemonArr.push({
      id: pokemonData.id,
      imgUrl: pokemonData.sprites.other.home.front_default,
      name: pokemonData.name,
    });
  });

  return {
    props: {
      data: pokemonArr,
    },
  };
}
