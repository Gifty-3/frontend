export enum MODAL_TYPE {
    GIFT_CREATE = 'giftcreate'
}

export interface IGiftCreateModalProps {
    modalType: MODAL_TYPE;
}


export type IModalProps = IGiftCreateModalProps