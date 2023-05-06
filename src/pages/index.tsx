import Navbar from "../../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center p-24">
        <div className="bg-blue-100">Hello World!</div>
      </main>
    </>
  );
}
