import { createContext, useContext } from "react";
import { IModalProps } from "../types";

interface IModalContext {
    open: (props: IModalProps, errors?: Error[]) => void;
    close: () => void;
    error: (errors: Error[]) => void;
}

const defaultValue: IModalContext = {
    open: () => { throw new Error("Used Outside") },
    close: () => { throw new Error("Used Outside") },
    error: () => { throw new Error("Used Outside") },
}
export const ModalContext = createContext(defaultValue)
export const useModal = () => useContext(ModalContext)