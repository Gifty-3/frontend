import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCards } from "../functions/cards";

export const useAllCards = () => {
  return useQuery(["cards"], () => {
    return getAllCards();
  });
};

export const usePaginatedCards = (
  address: string,
  page: number = 1,
  limit: number = 0
) => {
  const { data: allCards, dataUpdatedAt } = useAllCards();
  return useQuery(["cards", address, { page, limit, dataUpdatedAt }], () => {
    const cards = allCards?.slice((page - 1) * limit, page * limit);
    if (limit <= 0) throw new Error("Limit should be greater than  0");
    return {
      page,
      limit,
      data: cards ?? [],
      totalItems: allCards?.length,
      totalPage: Math.ceil((allCards?.length ?? 0) / limit),
    };
  });
};

export const useCardById = (address: string, id: number) => {
  const { data: allCards, dataUpdatedAt } = useAllCards();
  return useQuery(["cards", address, { id, dataUpdatedAt }], () => {
    const card = allCards?.find((c: { id: number; }) => c.id === id);
    if (!card) throw new Error("Card not found");
    return card;
  });
};
