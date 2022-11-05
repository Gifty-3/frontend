import { coin } from "@cosmjs/amino";
import React, { FC, useMemo } from "react";
import { useCardById } from "src/api/hooks/cards";

interface CardProps {
  tokenId: string;
}
const Card: FC<CardProps> = (props) => {
  const { tokenId } = props;
  const { data: token } = useCardById(tokenId);
  const tokenAmount = useMemo(() => {
    return coin(token?.amount ?? "0", "uusdcx");
  }, [token]);

  return (
    <div className="w-80 p-3 border-[1px] rounded-2xl hover:scale-105 transition-all duration-500">
      <img src="/card.png" className="w-full cursor-pointer" />
      <div className="flex flex-col px-4">
        <div className="flex flex-row mt-2">
          <span className="font-bold text-3xl">
            {parseInt(tokenAmount.amount) / 1000000}{" "}
            {tokenAmount.denom.toUpperCase().substring(1)}
          </span>
          <span className="text-xs ml-auto mt-1 gap-1 flex flex-row">
            <span className="font-light">From</span>
            <span className="text-secondary">juno123.....tokenid</span>
          </span>
        </div>

        <div className="flex flex-row mt-2 items-center gap-2">
          <span className="text-secondary text-xs">
            {token?.extension?.message}
          </span>
          <button className="btn btn-primary ml-auto btn-sm">Claim Now</button>
        </div>
      </div>
    </div>
  );
};
export default Card;
