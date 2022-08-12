import { createTheme } from "@mui/material/styles";
import Head from "next/head";
import FilterBox from "../components/FilterBox";
import Navbar from "../components/Navbar";
import ProductPage from "../components/ProductPage";

export default function Home() {


  return (
    <div className="bg-gray-200">
      <Head>
        <title>Orefy</title>
      </Head>
      <Navbar />
      <main className="min-h-screen pb-10">
        <div className="flex flex-grow m-20 space-x-5">
          <div className="bg-white w-1/4 shadow-md h-fit">
            <FilterBox />
          </div>
          <div className="w-3/4">
            <ProductPage />
          </div>
        </div>
      </main>
    </div>
  );
}
