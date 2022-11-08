import React, { FC, ReactNode } from "react";
import toast from "react-hot-toast";
import { useClaimCard } from "src/api/hooks/cards";
import PromiseButton from "../common/PromiseButton";
import { useModal } from "../Modals/provider/context";
import { MODAL_TYPE } from "../Modals/types";

interface ClaimNowProps {
  tokenId: string;
  children?: ReactNode;
}
const ClaimNow: FC<ClaimNowProps> = (props) => {
  const { tokenId, children } = props;
  const { mutateAsync } = useClaimCard();
  const { open } = useModal();

  const claim = async () => {
    await mutateAsync(tokenId)
      .then((res) => {
        toast.success("Claimed");
        open({
          modalType: MODAL_TYPE.CONFETTI,
          children: <div>Claimed Successfully!</div>,
        });
      })
      .catch((err) => {
        toast.error(err.message || "Error");
      });
  };
  return (
    <PromiseButton onClick={claim} className="btn btn-primary w-full h-full">
      {children}
    </PromiseButton>
  );
};
export default ClaimNow;
