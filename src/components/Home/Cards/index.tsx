import React, { FC, useEffect, useState } from "react";
import { usePaginatedCards } from "src/api/hooks/cards";
import { ADDRESS } from "src/dummy";
import { useWallet } from "src/providers";
import Card from "./Card";

const LIMIT = 15;

interface CardsProps {}
const Cards: FC<CardsProps> = (props) => {
  const {} = props;
  const { address } = useWallet();
  const [page, setPage] = useState(1);

  const { data: paginatedCards } = usePaginatedCards(address, page, LIMIT);

  const changePage = (offset: number) => {
    setPage((prev) =>
      Math.max(1, Math.min(prev + offset, paginatedCards?.totalPage ?? 1))
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center px-24 gap-6">
        <input
          className=" input input-bordered w-full input-ghost"
          placeholder="Search"
        />
        <div className="btn-group">
          <button onClick={() => changePage(-1)} className="btn">
            «
          </button>
          <button className="btn">Page {page}</button>
          <button onClick={() => changePage(+1)} className="btn">
            »
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-10 justify-center flex-wrap mt-10">
        {paginatedCards?.data.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
