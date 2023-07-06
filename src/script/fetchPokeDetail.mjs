import fs from "fs";
import fetch from "node-fetch";

// Do all the fetch requests
// Put them into a json file

async function fetchPokeDetail(pokemonNb) {
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonNb}/` // ** Change this url to not fetch a list but an individual pokemon. Look at the pokemon.json to see what this should look like
  );
  return await data.json();
}

async function getPokemonCount() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await response.json();
  const count = data.count; //1281
  console.log("Pokes:", count);
  return count; // **1281 the number of pokemon
}

const extractIdFromUrl = (url) => {
  const id = url.split("/");
  return id[6];
};

async function main() {
  const count = await getPokemonCount(); //*1281 Gives us the number of Pokemon
  const pokeDataRawJson = fs.readFileSync('./pokemon.json');
  const pokeData = JSON.parse(pokeDataRawJson)
  const pokemon = [];
  const ids = pokeData.map((entry) => extractIdFromUrl(entry.url));
  for (let i = 1; i < count; i++) {
    console.log("Fetching Pokemon ", i);
    // console.log("Pokemon has id" , ids[i])
    const results = await fetchPokeDetail(ids[i]);
    pokemon.push(results);
  }
  // save that to a file to pokemon.json
  console.log("Saving all the pokemon");
  // Saves the second argument of the function to a file named fist argument
  fs.writeFileSync("./pokemonDetail.json", JSON.stringify(pokemon)); // ** Save to a different file
  console.log("Saved!");
}

await main();

// fetchPokeDetail(1)
// returns
/*
{"count":1281,"next":"https://pokeapi.co/api/v2/pokemon?offset=20&limit=20","previous":null,"results":[{"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon/1/"},{"name":"ivysaur","url":"https://pokeapi.co/api/v2/pokemon/2/"},{"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},{"name":"charmander","url":"https://pokeapi.co/api/v2/pokemon/4/"},{"name":"charmeleon","url":"https://pokeapi.co/api/v2/pokemon/5/"},{"name":"charizard","url":"https://pokeapi.co/api/v2/pokemon/6/"},{"name":"squirtle","url":"https://pokeapi.co/api/v2/pokemon/7/"},{"name":"wartortle","url":"https://pokeapi.co/api/v2/pokemon/8/"},{"name":"blastoise","url":"https://pokeapi.co/api/v2/pokemon/9/"},{"name":"caterpie","url":"https://pokeapi.co/api/v2/pokemon/10/"},{"name":"metapod","url":"https://pokeapi.co/api/v2/pokemon/11/"},{"name":"butterfree","url":"https://pokeapi.co/api/v2/pokemon/12/"},{"name":"weedle","url":"https://pokeapi.co/api/v2/pokemon/13/"},{"name":"kakuna","url":"https://pokeapi.co/api/v2/pokemon/14/"},{"name":"beedrill","url":"https://pokeapi.co/api/v2/pokemon/15/"},{"name":"pidgey","url":"https://pokeapi.co/api/v2/pokemon/16/"},{"name":"pidgeotto","url":"https://pokeapi.co/api/v2/pokemon/17/"},{"name":"pidgeot","url":"https://pokeapi.co/api/v2/pokemon/18/"},{"name":"rattata","url":"https://pokeapi.co/api/v2/pokemon/19/"},{"name":"raticate","url":"https://pokeapi.co/api/v2/pokemon/20/"}]}
*/

