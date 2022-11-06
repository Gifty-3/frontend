import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useWallet } from "src/providers";
import { ICard } from "src/types/card";
import {
  claimCard,
  createCard,
  getAllCards,
  getAllContractCardsNum,
  getCardById,
} from "../functions/cards";

export const useAllCards = (address: string) => {
  const { wallet } = useWallet();
  return useQuery(
    ["cards", address, wallet],
    () => {
      return getAllCards(wallet, address);
    },
    {
      enabled: !!wallet,
    }
  );
};

export const usePaginatedCards = (
  address: string,
  page: number = 1,
  limit: number = 0
) => {
  const { data: allCards, dataUpdatedAt, error } = useAllCards(address);
  return useQuery(["cards", address, { page, limit, dataUpdatedAt }], () => {
    const cards = allCards?.slice((page - 1) * limit, page * limit);
    if (limit <= 0) throw new Error("Limit should be greater than  0");
    return {
      page,
      limit,
      data: cards ?? [],
      totalItems: allCards?.length ?? 0,
      totalPage: Math.ceil((allCards?.length ?? 0) / limit),
    };
  });
};

export const useCardById = (tokenId: string) => {
  const { wallet } = useWallet();
  return useQuery(
    ["cards", tokenId],
    () => {
      return getCardById(wallet, tokenId);
    },
    {
      enabled: !!wallet,
    }
  );
};

export const useGetAllTokensNum = () => {
  const { wallet } = useWallet();
  return useQuery(
    ["cards"],
    () => {
      return getAllContractCardsNum(wallet);
    },
    {
      enabled: !!wallet,
    }
  );
};

export const useCreateCard = () => {
  const { address, wallet } = useWallet();
  const client = useQueryClient();
  return useMutation(
    (card: Omit<ICard, "id">) => {
      return createCard(wallet, address, card);
    },
    {
      onSuccess: () => {
        client.invalidateQueries(["cards"]);
      },
    }
  );
};

export const useClaimCard = () => {
  const { wallet } = useWallet();
  const client = useQueryClient();
  return useMutation(
    (tokenId: string) => {
      return claimCard(wallet, tokenId);
    },
    {
      onSuccess: () => {
        client.invalidateQueries(["cards"]);
      },
    }
  );
};
