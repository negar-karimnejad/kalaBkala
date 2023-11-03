import Header from "./../../components/Header/Header";
import Navbar from "./../../components/Navbar/Navbar";
import Landing from "./../../components/Landing/Landing";
import SocialMedia from "./../../components/SocialMedia/SocialMedia";
import Footer from "./../../components/Footer/Footer";
import Support from "./../../components/Support/Support";
import Articles from "./../../components/Articles/Articles";
import CareProducts from "./../../components/CareProducts/CareProducts";
import Gifts from "./../../components/Gifts/Gifts";
import RandomProducts from "../../components/RandomProducts/RandomProducts";

function Home() {
  return (
    <div>
      <Header />
      <Navbar />
      <Landing />
      <RandomProducts />
      <CareProducts />
      <Gifts />
      <Articles />
      <SocialMedia />
      <Footer />
      <Support />
    </div>
  );
}

export default Home;
