import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Feature from "../Components/Feature";
import Footer from "../Components/Footer";
import SearchBox from "../Components/SearchBox";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Hero />
      <SearchBox />
      <Feature />
      <Footer />
    </>
  );
}
