import { ICard } from "./card";

export interface IToken {
    token_uri: string;
    amount: ICard['usdc_amount'];
    cw20_address: ICard['address'];
    cw721_address: ICard['address'];
    cw20_amount: ICard['amount'];
    cw721_amount: ICard['amount'];
    sender: string;
    message: string
}

export interface ICw20 {
    name: string;
    symbol: string;
    decimals: number;
    total_supply: number;
}

export interface ICw721 {
    name: string;
    symbol: string;
}

export interface ICw721Token {
    token_uri: string;
}