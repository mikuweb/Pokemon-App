import fs from "fs";
// Do all the fetch requests
// Put them into a json file

async function fetchPoke(page) {
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${parseInt(page) * 20}`
  );
  return await data.json();
}

async function getPageCount() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await response.json();
  const count = data.count;
  const nbPages = Math.ceil(count / data.results.length);
  console.log("Pages:", nbPages);
  return nbPages // ==>65 pages (20 / 1281 = 64.05)
}

async function main() {
  const count = await getPageCount(); // Gives us the number of pages
  const pokemon = [];
  for (let i = 0; i < count; i++) {
    console.log("Fetching page ", i);
    const { results } = await fetchPoke(i);
    pokemon.push(...results);
  }
  // save that to a file to pokemon.json
  console.log("Saving all the pokemon");
  // Saves the second argument of the function to a file named fist argument
  fs.writeFileSync("./pokemon.json", JSON.stringify(pokemon));
  console.log("Saved!");
}

await main();

// fetchPoke(1)
// returns
/*
{"count":1281,"next":"https://pokeapi.co/api/v2/pokemon?offset=20&limit=20","previous":null,"results":[{"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon/1/"},{"name":"ivysaur","url":"https://pokeapi.co/api/v2/pokemon/2/"},{"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},{"name":"charmander","url":"https://pokeapi.co/api/v2/pokemon/4/"},{"name":"charmeleon","url":"https://pokeapi.co/api/v2/pokemon/5/"},{"name":"charizard","url":"https://pokeapi.co/api/v2/pokemon/6/"},{"name":"squirtle","url":"https://pokeapi.co/api/v2/pokemon/7/"},{"name":"wartortle","url":"https://pokeapi.co/api/v2/pokemon/8/"},{"name":"blastoise","url":"https://pokeapi.co/api/v2/pokemon/9/"},{"name":"caterpie","url":"https://pokeapi.co/api/v2/pokemon/10/"},{"name":"metapod","url":"https://pokeapi.co/api/v2/pokemon/11/"},{"name":"butterfree","url":"https://pokeapi.co/api/v2/pokemon/12/"},{"name":"weedle","url":"https://pokeapi.co/api/v2/pokemon/13/"},{"name":"kakuna","url":"https://pokeapi.co/api/v2/pokemon/14/"},{"name":"beedrill","url":"https://pokeapi.co/api/v2/pokemon/15/"},{"name":"pidgey","url":"https://pokeapi.co/api/v2/pokemon/16/"},{"name":"pidgeotto","url":"https://pokeapi.co/api/v2/pokemon/17/"},{"name":"pidgeot","url":"https://pokeapi.co/api/v2/pokemon/18/"},{"name":"rattata","url":"https://pokeapi.co/api/v2/pokemon/19/"},{"name":"raticate","url":"https://pokeapi.co/api/v2/pokemon/20/"}]}
*/
