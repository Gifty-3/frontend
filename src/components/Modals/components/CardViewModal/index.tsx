import React, { FC } from "react";
import { useModal } from "../../provider/context";
import PromiseButton from "@/components/common/PromiseButton";
import { ICardViewModalProps } from "../../types";
import { useCardById } from "src/api/hooks/cards";
import ClaimNow from "@/components/cta/ClaimNow";
import {
  useGetCw20,
  useGetCw721,
  useGetCw721Token,
} from "src/api/hooks/contract";

const CardViewModal: FC<ICardViewModalProps> = (props) => {
  const { tokenId } = props;
  const { close } = useModal();
  const { data: token } = useCardById(tokenId);
  const { data: cw20 } = useGetCw20(token?.cw20_address);
  const { data: cw721 } = useGetCw721(token?.cw721_address);
  const { data: cw721Token } = useGetCw721Token(
    token?.cw721_address,
    token?.cw721_amount
  );

  return (
    <div className="flex flex-col w-[40vw]">
      <span className="font-bold text-lg">Your Gift Card</span>

      <div className="overflow-x-auto mt-6">
        <table className="table w-full border border-white/30 text-sm">
          <tbody>
            <tr>
              <td className="border border-white/10 w-full">Sender</td>
              <th className="border border-white/10 w-full">{token?.sender}</th>
            </tr>
            <tr>
              <td className="border border-white/10">Amount</td>
              <th className="border border-white/10">
                {Number(token?.amount) / 1000000} USDC
              </th>
            </tr>
            <tr>
              <td className="border border-white/10">Theme</td>
              <th className="border border-white/10">
                <img src={token?.token_uri} />
              </th>
            </tr>
            <tr>
              <td className="border border-white/10">Message</td>
              <th className="border border-white/10">{token?.message}</th>
            </tr>

            {/* CW20 START */}
            {cw20 && (
              <tr>
                <td className="border border-white/10">Cw20 Address</td>
                <th className="border border-white/10">
                  {token?.cw20_address}
                </th>
              </tr>
            )}
            {cw20 && (
              <tr>
                <td className="border border-white/10">Cw20 Name</td>
                <th className="border border-white/10">{cw20?.name}</th>
              </tr>
            )}
            {cw20 && (
              <tr>
                <td className="border border-white/10">Cw20 Amount</td>
                <th className="border border-white/10">{token?.cw20_amount}</th>
              </tr>
            )}
            {cw20 && (
              <tr>
                <td className="border border-white/10">Cw20 Symbol</td>
                <th className="border border-white/10">{cw20?.symbol}</th>
              </tr>
            )}

            {/* CW721 START */}
            {cw721 && (
              <tr>
                <td className="border border-white/10">Cw721 Address</td>
                <th className="border border-white/10">
                  {token?.cw721_address}
                </th>
              </tr>
            )}
            {cw721 && (
              <tr>
                <td className="border border-white/10">Cw721 Name</td>
                <th className="border border-white/10">{cw721?.name}</th>
              </tr>
            )}
            {cw721 && (
              <tr>
                <td className="border border-white/10">Cw721 Symbol</td>
                <th className="border border-white/10">{cw721?.symbol}</th>
              </tr>
            )}
            {cw721Token && (
              <tr>
                <td className="border border-white/10">Cw721 NFT Image</td>
                <th className="border border-white/10">
                  <a
                    href={cw721Token?.token_uri}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={cw721Token?.token_uri} />
                  </a>
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-row items-center gap-4 mt-6 w-full justify-end">
        <button onClick={close} className=" btn btn-ghost">
          Cancel
        </button>
        <ClaimNow tokenId={tokenId}>Claim Now</ClaimNow>
      </div>
    </div>
  );
};
export default CardViewModal;
