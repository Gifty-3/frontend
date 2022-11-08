import { ReactNode } from "react";

export enum MODAL_TYPE {
    GIFT_CREATE = 'giftcreate',
    CARD_VIEW = 'cardview',
    CONFETTI = 'confetti',
}

export interface IGiftCreateModalProps {
    modalType: MODAL_TYPE.GIFT_CREATE;
}
export interface ICardViewModalProps {
    modalType: MODAL_TYPE.CARD_VIEW;
    tokenId: string;
}

export interface IConfettiModalProps {
    modalType: MODAL_TYPE.CONFETTI,
    children?: ReactNode;
}


export type IModalProps<type extends MODAL_TYPE> = { modalType: type } & (IGiftCreateModalProps | ICardViewModalProps | IConfettiModalProps)