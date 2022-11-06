import ConnectWalletButton from "@/components/cta/ConnectWallet";
import React, { FC } from "react";
import { useGetAllTokensNum } from "src/api/hooks/cards";

interface BannerProps {}
const Banner: FC<BannerProps> = (props) => {
  const {} = props;
  const { data: totalTokens } = useGetAllTokensNum();

  return (
    <div className="w-full px-[12rem] grid grid-cols-2">
      <div className="flex flex-col col-span-1 py-10 pl-10">
        <h1 className="font-bold text-5xl">Welcome to Gift 3!</h1>
        <p className="text-lg mt-6 max-w-sm">
          Send and receive decentralized gift cards instantaneously!
        </p>
        <div className="mt-10 max-w-xs">
          <ConnectWalletButton />
        </div>
      </div>
      <div className="col-span-1 flex flex-col items-end justify-center px-4">
        <div className="stats shadow stats-horizontal border border-white/10 cursor-pointer transform transition-all hover:scale-110 hover:shadow-lg">
          <div className="stat place-items-end">
            <div className="stat-title">Total Cards Created</div>
            <div className="stat-value">{totalTokens ?? 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
