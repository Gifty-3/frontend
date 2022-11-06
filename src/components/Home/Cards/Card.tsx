import { coin } from "@cosmjs/amino";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import React, { FC, useMemo } from "react";
import { useCardById } from "src/api/hooks/cards";
import CONFIG from "src/config";
import { useWallet } from "src/providers";

interface CardProps {
  tokenId: string;
}
const Card: FC<CardProps> = (props) => {
  const { tokenId } = props;
  const { data: token } = useCardById(tokenId);
  const {wallet, address} = useWallet();
  const tokenAmount = useMemo(() => {
    return coin(token?.amount ?? "0", "uusdcx");
  }, [token]);

  const sender = useMemo(() => {
    return token?.sender
  }, [token]);

  const image = useMemo(() => {
    return token?.token_uri
  }, [token]);

  const claim = async (token_id: string) => {
    if (!wallet) throw new Error("Wallet not connected");
    await wallet.execute(
      address,
      CONFIG.CONTRACT_ADDRESS,
      {
        claim: {
          token_id: token_id
        }
      },
      "auto",
      ""
      
    )
  }

  return (
    <div className="w-80 p-3 border-[1px] rounded-2xl hover:scale-105 transition-all duration-500">
      <img src={image} className="w-full cursor-pointer" />
      <div className="flex flex-col px-4">
        <div className="flex flex-row mt-2">
          <span className="font-bold text-3xl">
            ${parseInt(tokenAmount.amount) / 1000000}{" "}
            
          </span>
          <span className="text-xs ml-auto mt-1 gap-1 flex flex-row">
            <span className="font-light">From</span>
            <span className="text-secondary">{sender?.slice(0,8)}...</span>
          </span>
        </div>

        <div className="flex flex-row mt-2 items-center gap-2">
          <span className="text-secondary text-xs">
            {token?.extension?.message}
          </span>
          <button onClick={() => claim(tokenId)} className="btn btn-primary ml-auto btn-sm">Claim Now</button>
        </div>
      </div>
    </div>
  );
};
export default Card;
