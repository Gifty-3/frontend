import React, { FC, useState } from "react";

type IElementType = JSX.IntrinsicElements["button"];

interface PromiseButtonProps extends IElementType {}
const PromiseButton: FC<PromiseButtonProps> = (props) => {
  const { className, onClick, ...btnProps } = props;
  const [loading, setLoading] = useState(false);

  const handleClick: IElementType["onClick"] = async (e) => {
    setLoading(true);
    try {
      await onClick?.(e);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <button
      className={`${className} ${loading ? "loading" : ""}`}
      onClick={handleClick}
      {...btnProps}
    />
  );
};
export default PromiseButton;
