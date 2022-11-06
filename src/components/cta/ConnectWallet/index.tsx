import React, { FC, HTMLAttributes } from "react";
import { useWallet } from "../../../providers/Wallet";
import { useModal } from "@/components/Modals/provider/context";
import { MODAL_TYPE } from "@/components/Modals/types";
import PromiseButton from "@/components/common/PromiseButton";
interface ConnectWalletButtonProps {}
const ConnectWalletButton: FC<ConnectWalletButtonProps> = (props) => {
  const {} = props;
  const { connect, connected } = useWallet();
  const { open } = useModal();
  return (
    <div>
      {connected ? (
        <button
          onClick={() => open({ modalType: MODAL_TYPE.GIFT_CREATE })}
          className="btn btn-primary w-full"
        >
          Create Gift Card
        </button>
      ) : (
        <PromiseButton onClick={connect} className="btn btn-primary w-full">
          Connect Wallet
        </PromiseButton>
      )}
    </div>
  );
};
export default ConnectWalletButton;
