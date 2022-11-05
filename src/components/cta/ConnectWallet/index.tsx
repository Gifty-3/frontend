import React, { FC, HTMLAttributes } from "react";
import {useWallet} from "../../../providers/Wallet";
import { useModal } from "@/components/Modals/provider/context";
import { MODAL_TYPE } from "@/components/Modals/types";
interface ConnectWalletButtonProps {}
const ConnectWalletButton: FC<ConnectWalletButtonProps> = (props) => {
  const {} = props;
  const {connect, connected} = useWallet();
  const {open} = useModal();
  return (
    <div>
      {connected ? <button onClick={() => open({ modalType: MODAL_TYPE.GIFT_CREATE })} className="btn btn-primary w-full">Create Gift Card</button> : <button onClick={connect} className="btn btn-primary w-full">Connect Wallet</button> }
    </div>
    )
};
export default ConnectWalletButton;
