import React, { FC } from "react";
import Item from "./Item";

interface FiltersProps {}
const Filters: FC<FiltersProps> = (props) => {
  const {} = props;

  return (
    <div className="flex flex-row items-start w-full gap-10 justify-center">
      {[...new Array(6)].map((i, idx) => (
        <Item key={idx} />
      ))}
    </div>
  );
};
export default Filters;
