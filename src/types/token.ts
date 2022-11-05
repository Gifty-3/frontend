import { ICard } from "./card";

export interface IToken {
    token_uri: string;
    extension: Record<string, any>;
    amount: ICard['usdc_amount'];
    cw20_address: ICard['address'],
    cw721_address: ICard['address'],
    cw20_amount: ICard['amount'],
    cw721_amount: ICard['amount'],
}