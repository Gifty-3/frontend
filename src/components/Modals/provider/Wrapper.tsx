import React, { FC, memo, ReactNode, useCallback, useState } from "react";
import { IModalProps, MODAL_TYPE } from "../types";
import { ModalContext } from "./context";
import { Renderer } from "./renderer";

interface ModalWrapperProps {
  children?: ReactNode;
}
const ModalWrapper: FC<ModalWrapperProps> = (props) => {
  const { children } = props;
  const [modalProps, setModalProps] = useState<IModalProps<MODAL_TYPE>>();
  const [errors, setErrors] = useState<Error[]>();

  const open = useCallback(
    (_newProps: IModalProps<MODAL_TYPE>, _errors?: Error[]) => {
      setErrors(_errors);
      setModalProps(_newProps);
    },
    []
  );

  const close = useCallback(() => {
    setErrors(undefined);
    setModalProps(undefined);
  }, []);

  const error = useCallback((_errors: Error[]) => {
    setErrors(_errors);
  }, []);

  const Component = memo(function Component() {
    if (!modalProps) return null;
    const ModalComp = Renderer[modalProps.modalType];
    return (
      <div className="modal modal-bottom sm:modal-middle modal-open bg-opacity-60">
        <div className="modal-box relative !max-w-none !w-auto border border-white/50 !rounded-none">
          <button
            onClick={close}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </button>
          {errors ? <div>Errors</div> : <ModalComp {...modalProps} />}
        </div>
      </div>
    );
  });

  return (
    <ModalContext.Provider value={{ open, close, error }}>
      {children}
      <Component />
    </ModalContext.Provider>
  );
};
export default ModalWrapper;
