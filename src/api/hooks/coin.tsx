import { useQuery } from "@tanstack/react-query";
import { useWallet } from "src/providers";
import { COINS_DENOM } from "src/types/coin";

export const useGetBalance = (address: string, denom: COINS_DENOM) => {
  const { wallet } = useWallet();
  return useQuery(
    ["coins", address, denom],
    () => {
      if (!wallet) throw new Error("Wallet not connected");
      return wallet.getBalance(address, denom);
    },
    {
      enabled: !!wallet,
    }
  );
};
