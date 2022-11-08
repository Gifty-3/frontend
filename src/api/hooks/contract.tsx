import { useQuery } from "@tanstack/react-query";
import { useWallet } from "src/providers";
import { getCw20, getCw721, getCw721Token } from "../functions/contract";

export const useGetCw20 = (address?: string) => {
  const { wallet } = useWallet();
  return useQuery(
    ["contract", "cw20", address],
    () => {
      if (!address) throw new Error("No Address");
      return getCw20(wallet, address);
    },
    {
      enabled: !!wallet && !!address,
    }
  );
};

export const useGetCw721 = (address?: string) => {
  const { wallet } = useWallet();
  return useQuery(
    ["contract", "cw721", address],
    () => {
      if (!address) throw new Error("No Address");
      return getCw721(wallet, address);
    },
    {
      enabled: !!wallet && !!address,
    }
  );
};

export const useGetCw721Token = (address?: string, tokenId?: string) => {
  const { wallet } = useWallet();
  return useQuery(
    ["contract", "cw721", address, tokenId],
    () => {
      if (!address) throw new Error("No Address");
      if (!tokenId) throw new Error("No Token Id");
      return getCw721Token(wallet, address, tokenId);
    },
    {
      enabled: !!wallet && !!address && tokenId !== undefined,
    }
  );
};
