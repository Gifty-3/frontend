import { ICard } from "src/types/card";
import { SigningCosmWasmClient, toBinary } from "@cosmjs/cosmwasm-stargate"
import { coin } from "@cosmjs/amino";
import { nanoid } from 'nanoid'
import CONFIG from "src/config";
import { IToken } from "src/types/token";

/// Gets all cards for a certain address
export const getAllCards = async (wallet: SigningCosmWasmClient | undefined, address: string) => {
    if (!wallet) throw new Error("Wallet not connected");
    const cards = await wallet.queryContractSmart(
        CONFIG.CONTRACT_ADDRESS,
        {
            tokens: {
                owner: address
            }
        }
    )
    return cards?.tokens as string[];
}

export const getCardById = async (wallet: SigningCosmWasmClient | undefined, tokenId: string) => {
    if (!wallet) throw new Error("Wallet not connected");
    const token = await wallet.queryContractSmart(
        CONFIG.CONTRACT_ADDRESS,
        {
            nft_info: {
                token_id: tokenId
            }
        }
    )
    console.log(token)
    return token as IToken;
}

export const createCard = async (wallet: SigningCosmWasmClient | undefined, address: string, card: Omit<ICard, 'id'>) => {
    if (!wallet) throw new Error("Wallet not connected");
    const contract_address: string = card.address!;
    if (card.include === "CW20") {
        let message = {
            mint: {
                token_id: nanoid(),
                owner: card.recipient,
                lockup_time: "0",
                token_uri: card.theme,
                message: card.message
            },
        };

        let binary_message = toBinary(message);
        await wallet.execute(
            address, // Sender wallet
            contract_address, // Contract address should be the CW20 contract which they are sending from
            {
                send: {
                    contract: CONFIG.CONTRACT_ADDRESS, // Contract address of Gift Card
                    msg: binary_message, // Binary of msg to call on backend
                    amount: card.amount!, // Amount to send from CW20
                },
            },
            "auto",
            ""
        );
    }

    if (card.include === "CW721") {
        let message = {
            mint: {
                token_id: nanoid(),
                owner: card.recipient,
                lockup_time: "0",
                token_uri: card.theme,
                message: card.message
            },
        };

        let binary_message = toBinary(message);
        await wallet.execute(
            address, // Sender wallet
            contract_address, // Contract address should be the CW721 contract which they are sending from
            {
                send: {
                    contract_address: CONFIG.CONTRACT_ADDRESS, // Contract address of Gift Card
                    msg: binary_message, // Binary of msg to call on backend
                    amount: card.amount, // Token ID of the NFT to send
                },
            },
            "auto", // fees to set for transaction (deduced automatically),
            ""
        );
    }
    if (card.include === "None") {
        console.log({
            address, // Sender wallet
            cont: CONFIG.CONTRACT_ADDRESS, // Contract address should be the CW721 contract which they are sending from,
            msg: {
                mint: {
                    token_id: nanoid(),
                    owner: card.recipient,
                    lockup_time: "0",
                    token_uri: card.theme,
                    message: card.message
                },
            },
        })
        await wallet.execute(
            address, // Sender wallet
            CONFIG.CONTRACT_ADDRESS, // Contract address should be the CW721 contract which they are sending from,
            {
                mint: {
                    token_id: nanoid(),
                    owner: card.recipient,
                    lockup_time: "0",
                    token_uri: card.theme,
                    extension: {
                        message: card.message,
                    },
                },
            },
            "auto",
            "",
            [coin(card.usdc_amount!, "uusdcx")]
        );
    }
}