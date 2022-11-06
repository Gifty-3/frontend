import React, { FC } from "react";
import ReactConfetti from "react-confetti";
import { useModal } from "../../provider/context";
import { IConfettiModalProps } from "../../types";

const ConfettiModal: FC<IConfettiModalProps> = (props) => {
  const { children } = props;
  const { close } = useModal();

  return (
    <div className="flex flex-col w-[40vw] pt-4 min-h-[50vh]">
      <div className="flex flex-col items-center justify-center flex-1 text-3xl font-bold text-center ">
        {children}
      </div>
      <ReactConfetti
        gravity={0.1}
        recycle={true}
        className="self-center w-full h-full"
      />
      <div className="flex flex-row items-center gap-4 pt-6 w-full justify-end mt-auto">
        <button onClick={close} className=" btn btn-outline btn-info">
          Close
        </button>
      </div>
    </div>
  );
};
export default ConfettiModal;
