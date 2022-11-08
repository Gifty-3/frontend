import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import CONFIG from "src/config";
import { ICw20, ICw721, ICw721Token, IToken } from "src/types/token";

export const getCw20 = async (wallet: SigningCosmWasmClient | undefined, contractAddress: string) => {
    if (!wallet) throw new Error("Wallet not connected");
    const token = await wallet.queryContractSmart(
        contractAddress,
        {
            token_info: {
            }
        }
    )
    return token as ICw20;
}

export const getCw721 = async (wallet: SigningCosmWasmClient | undefined, contractAddress: string) => {
    if (!wallet) throw new Error("Wallet not connected");
    const token = await wallet.queryContractSmart(
        contractAddress,
        {
            contract_info: {
            }
        }
    )
    return token as ICw721;
}

export const getCw721Token = async (wallet: SigningCosmWasmClient | undefined, contractAddress: string, tokenId: string) => {
    if (!wallet) throw new Error("Wallet not connected");
    const token = await wallet.queryContractSmart(
        contractAddress,
        {
            nft_info: {
                tokenId
            }
        }
    )
    return token as ICw721Token;
}