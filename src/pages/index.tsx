import Navbar from "../components/Navbar";

//  Color Pallet
// Navber: blue-900
// Button: blue-600 / blue-100
// Button: yellow-400 / yellow-500
// Score:  cyan-400

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-br from-sky-100 via-cyan-100 to-emerald-200 flex flex-col items-center min-h-screen">
        {/* CONTAINER */}
        <div className="w-fit lg:w-2/5 lg:max-w-screen-sm flex flex-col items-center">
          <button className="w-44 text-sm py-1 my-5 bg-yellow-400 hover:bg-yellow-500 text-blue-600 rounded-full">
            LEARN THE RULES
          </button>
          <h1 className="font-bold text-4xl">Guess the Pokémon!</h1>
          {/* SCORE & NEXT BTN */}
          <div className="mt-5 flex items-center gap-16">
            <div className="w-28 h-28 rounded-full bg-white border-[14px]  border-cyan-400/40 flex justify-center items-center">
              <span className="font-bold text-4xl text-cyan-400">10</span>
            </div>
            <button className="w-44 text-xl font-semibold py-1 border-2 border-blue-600 bg-white hover:bg-blue-100 transition text-blue-600 rounded-full">
              Next
              <br />
              Pokémon
            </button>
          </div>
          {/* POKEMON */}
          <div className=" w-80">
            <img src="https://archives.bulbagarden.net/media/upload/4/4a/0025Pikachu.png" />
          </div>
          {/* INPUT */}
          <div className="w-3/4 py-3 text-4xl font-bold flex items-center justify-center rounded-3xl bg-white border-2 border-blue-900 uppercase">
            Pikachu
          </div>
        </div>
      </main>
    </>
  );
}
