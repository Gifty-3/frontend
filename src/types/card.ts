export interface ICard {
    id: number;
    recipient: string;
    message: string;
    theme: typeof THEMES[number];
    include: 'CW721' | 'CW20' | 'None'
    amount?: string;
    tokenId?: string;
    address?: string,
    usdc_amount?: string
}

export const THEMES = ['CHRISTMAS', 'BIRTHDAY', 'CUSTOM'] as const;