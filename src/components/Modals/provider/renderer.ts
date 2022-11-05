import { FC } from "react";
import { GiftCreateModal } from "../components";
import { IModalProps, MODAL_TYPE } from "../types";

export const Renderer: Record<MODAL_TYPE, FC<IModalProps>> = {
    [MODAL_TYPE.GIFT_CREATE]: GiftCreateModal
}