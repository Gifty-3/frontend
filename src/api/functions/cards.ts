import { ICard } from "src/types/card";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { coin } from "@cosmjs/amino";
import { nanoid } from 'nanoid'

/// Gets all cards for a certain address
export const getAllCards = async (wallet: SigningCosmWasmClient | undefined, address: string) => {
    if (!wallet) throw new Error("Wallet not connected");
    const cards = await wallet.queryContractSmart(
        "juno1s575neg3vzrdhe8r7tg70l9w2pxzzmu8pv4qm09f7gkwy326uf6sylnmnk",
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
    const card = await wallet.queryContractSmart(
        "juno1s575neg3vzrdhe8r7tg70l9w2pxzzmu8pv4qm09f7gkwy326uf6sylnmnk",
        {
            nft_info: {
                token_id: tokenId
            }
        }
    )
    return card as any;
}

export const createCard = async (wallet: SigningCosmWasmClient | undefined, address: string, card: Omit<ICard, 'id'>) => {
    if (!wallet) throw new Error("Wallet not connected");
    const contract_address: string = card.address!;
    if (card.include === "CW20") {
        await wallet.execute(
            address, // Sender wallet
            contract_address, // Contract address should be the CW20 contract which they are sending from
            {
                send: {
                    contract: "juno1tx47awjd5aztmy6jt6hs3cknlf8dxawgtwntvy", // Contract address of Gift Card
                    msg: "", // Binary of msg to call on backend
                    amount: card.amount!, // Amount to send from CW20
                },
            },
            "auto",
            ""
        );
    }

    if (card.include === "CW721") {
        await wallet.execute(
            address, // Sender wallet
            contract_address, // Contract address should be the CW721 contract which they are sending from
            {
                send: {
                    contract_address: "juno1tx47awjd5aztmy6jt6hs3cknlf8dxawgtwntvy", // Contract address of Gift Card
                    msg: "", // Binary of msg to call on backend
                    amount: card.amount, // Token ID of the NFT to send
                },
            },
            "auto", // fees to set for transaction (deduced automatically),
            ""
        );
    }

    if (card.include === "None") {
        console.log(address)
        await wallet.execute(
            address, // Sender wallet
            "juno1s575neg3vzrdhe8r7tg70l9w2pxzzmu8pv4qm09f7gkwy326uf6sylnmnk", // Contract address should be the CW721 contract which they are sending from,
            {
                mint: {
                    token_id: nanoid(),
                    owner: card.owner,
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