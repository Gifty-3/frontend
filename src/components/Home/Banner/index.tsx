import ConnectWalletButton from "@/components/cta/ConnectWallet";
import React, { FC } from "react";
import CONFIG from "src/config";
import { useWallet } from "src/providers";

interface BannerProps {}
const Banner: FC<BannerProps> = (props) => {
  const {} = props;
  const {wallet} = useWallet();
  const total_cards = wallet?.queryContractSmart(
    CONFIG.CONTRACT_ADDRESS,
    {
      num_tokens: {}
    }
  )
  return (
    <div className="w-full px-[12rem] grid grid-cols-2">
      <div className="flex flex-col col-span-1 py-10 pl-10">
        <h1 className="font-bold text-5xl">Welcome to Gift 3!</h1>
        <p className="text-lg mt-6 max-w-sm">
          Send and receive decentralized gift cards on JUNO instantaneously!
        </p>
        <div className="mt-10 max-w-xs">
          <ConnectWalletButton />
        </div>
      </div>
      <div className="col-span-1 flex flex-col items-end justify-center px-4">
      </div>
    </div>
  );
};
export default Banner;
