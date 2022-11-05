import React, { FC } from "react";

interface ItemProps {}
const Item: FC<ItemProps> = (props) => {
  const {} = props;

  return (
    <button className="flex flex-col items-center hover:scale-105 transition-all hover:font-medium">
      <img
        className="mask mask-circle w-16"
        src="https://placeimg.com/160/160/tech"
      />
      <span className="mt-2 text-sm">Filter</span>
    </button>
  );
};
export default Item;
