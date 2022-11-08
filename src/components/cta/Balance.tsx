import React, { FC, useMemo } from "react";
import { useGetBalance } from "src/api/hooks/coin";
import { useWallet } from "src/providers";
import { COINS_DENOM } from "src/types/coin";

interface BalanceProps {
  denom?: COINS_DENOM;
}
const Balance: FC<BalanceProps> = (props) => {
  const { denom = COINS_DENOM.USDC } = props;
  const { address } = useWallet();
  const { data: balance } = useGetBalance(address, denom);
  if (!balance) return null;
  return (
    <div className="flex flex-row items-center gap-2 badge">
      <span className="font-medium text-sm" >{balance.amount}</span>
      <span className="text-sm font-light italic" >{balance.denom}</span>
    </div>
  );
};
export default Balance;
