import ClaimNow from "@/components/cta/ClaimNow";
import { useModal } from "@/components/Modals/provider/context";
import { MODAL_TYPE } from "@/components/Modals/types";
import { coin } from "@cosmjs/amino";
import React, { FC, useMemo } from "react";
import { useCardById } from "src/api/hooks/cards";

interface CardProps {
  tokenId: string;
}
const Card: FC<CardProps> = (props) => {
  const { tokenId } = props;
  const { open } = useModal();
  const { data: token } = useCardById(tokenId);

  const tokenAmount = useMemo(() => {
    return coin(token?.amount ?? "0", "uusdcx");
  }, [token]);

  return (
    <div className="w-80 p-3 border-[1px] rounded-2xl hover:scale-105 transition-all duration-500 relative flex flex-col">
      <div className="flex flex-col max-h-60 overflow-hidden">
        <img
          onClick={() => {
            open({
              modalType: MODAL_TYPE.CARD_VIEW,
              tokenId: tokenId,
            });
          }}
          src={token?.token_uri}
          className="w-full cursor-pointer object-cover"
        />
      </div>
      <div className="flex flex-row px-4">
        <div className="flex flex-col mt-2">
          <span className="font-bold text-2xl">
            ${parseInt(tokenAmount.amount) / 1000000}{" "}
          </span>
          <span className="text-xs mt-1 gap-1 flex flex-row">
            <span className="font-light">From</span>
            <span className="text-secondary">
              {token?.sender?.slice(0, 8)}...
              {token?.sender?.slice((token?.sender?.length || 4) - 4)}
            </span>
          </span>
        </div>

        <div className="flex flex-row items-center gap-2 mt-auto pt-2 ml-auto">
          <span className="text-secondary text-xs">
            {token?.extension?.message}
          </span>
          <div className="ml-auto mt-auto">
            <ClaimNow tokenId={tokenId}>Claim Now</ClaimNow>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
