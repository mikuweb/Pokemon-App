import Navbar from "../components/Navbar";


export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="p-24 bg-gradient-to-br from-sky-100 via-cyan-100 to-cyan-200 flex min-h-screen flex-col items-center ">
        <div className="bg-blue-100">Hello World!</div>
      </main>
    </>
  );
}
