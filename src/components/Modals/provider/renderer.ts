import { FC } from "react";
import { CardViewModal, GiftCreateModal } from "../components";
import ConfettiModal from "../components/ConfettiModal";
import { IModalProps, MODAL_TYPE } from "../types";

export const Renderer: Record<MODAL_TYPE, FC<any>> = {
    [MODAL_TYPE.GIFT_CREATE]: GiftCreateModal,
    [MODAL_TYPE.CONFETTI]: ConfettiModal,
    [MODAL_TYPE.CARD_VIEW]: CardViewModal,
}