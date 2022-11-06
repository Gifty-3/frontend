import React, { FC } from "react";
import { useModal } from "../../provider/context";
import PromiseButton from "@/components/common/PromiseButton";
import { ICardViewModalProps } from "../../types";
import { useCardById } from "src/api/hooks/cards";
import ClaimNow from "@/components/cta/ClaimNow";

const CardViewModal: FC<ICardViewModalProps> = (props) => {
  const { tokenId } = props;
  const { close } = useModal();
  const { data: token } = useCardById(tokenId);

  return (
    <div className="flex flex-col w-[40vw]">
      <span className="font-bold text-lg">Your Gift Card</span>

      <div className="overflow-x-auto mt-6">
        <table className="table w-full border border-white/30 text-sm table-fixed">
          <tbody>
            <tr>
              <td className="border border-white/10">Owner</td>
              <th className="border border-white/10">asd</th>
            </tr>
            <tr>
              <td className="border border-white/10">Amount</td>
              <th className="border border-white/10">{token?.amount} uusdcx</th>
            </tr>
            <tr>
              <td className="border border-white/10">Theme</td>
              <th className="border border-white/10">{token?.token_uri}</th>
            </tr>
            <tr>
              <td className="border border-white/10">Message</td>
              <th className="border border-white/10">
                {token?.extension?.message ?? ""}
              </th>
            </tr>
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
