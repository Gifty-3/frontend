import React, { FC } from "react";
import Banner from "./Banner";
import Cards from "./Cards";
import Filters from "./Filters";

interface HomeProps {}
const Home: FC<HomeProps> = (props) => {
  const {} = props;

  return (
    <div className="flex flex-col">
      <Banner />
      <div className="flex flex-col bg-neutral w-full py-10 mt-10">
        <div className="mt-24">
          <Cards />
        </div>
      </div>
    </div>
  );
};
export default Home;
