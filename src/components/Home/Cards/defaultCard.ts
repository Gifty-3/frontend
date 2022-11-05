import { ICard } from "src/types/card";

export const DEFAULT_CARD: Omit<ICard, 'id'> = {
    'recipient': '',
    'message': '',
    'theme': 'BIRTHDAY',
    'include': 'CW20',
    amount: '',
    address: '',
    usdc_amount: ''
}