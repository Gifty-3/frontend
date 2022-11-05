import { useModal } from "@/components/Modals/provider/context";
import { MODAL_TYPE } from "@/components/Modals/types";
import React, { FC, useState } from "react";
import { usePaginatedCards } from "src/api/hooks/cards";
import { ADDRESS } from "src/dummy";
import {useWallet} from "../../../providers/Wallet";
interface NavbarProps {}
const Navbar: FC<NavbarProps> = (props) => {
  const {} = props;
  const { data } = usePaginatedCards(ADDRESS, 1, 1);
  const { open } = useModal();
  const {connect, wallet, connected, disconnect} = useWallet();
  return (
    <div className="w-full relative flex flex-row items-center h-24">
      <img
        className="mask mask-circle h-full absolute left-0"
        src="https://placeimg.com/160/160/arch"
      />
      <div className="w-full bg-base-content h-12 rounded-l-full rounded-br-full overflow-hidden flex flex-row text-base-100 pl-36">
        <div className="btn-group">
          <a href="#" className="btn btn-ghost">
            Home
          </a>

          <a href="#" className="btn btn-ghost gap-2">
            Your Gift Cards
            <span className="badge badge-info badge-sm">
              {data?.totalItems}
            </span>
          </a>
          <button
            onClick={() => open({ modalType: MODAL_TYPE.GIFT_CREATE })}
            className="btn btn-ghost"
          >
            Create New
          </button>
        </div>
        <div className="flex flex-row items-center ml-auto">
          {connected ?  <button onClick={disconnect} className="h-full btn btn-primary rounded-none">
            
            Disconnect
          </button>
          :
           <button onClick={connect} className="h-full btn btn-primary rounded-none">
            
            Connect Wallet
          </button>}
          
        </div>
      </div>
    </div>
  );
};
export default Navbar;
