import { DEFAULT_CARD } from "@/components/Home/Cards/defaultCard";
import { ICard } from "src/types/card";
import { useWallet } from "src/providers";
import {SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate"
/// Gets all cards for a certain address

export const getAllCards = async () => {
    const {wallet, address} = useWallet();
    console.log("hello")
    let  wallet_signing: SigningCosmWasmClient = wallet
    let cards = await wallet_signing.queryContractSmart(
        "juno1s575neg3vzrdhe8r7tg70l9w2pxzzmu8pv4qm09f7gkwy326uf6sylnmnk",
        {
            tokens: {
                owner: address
            }
        }
    )
    return cards.tokens;
}