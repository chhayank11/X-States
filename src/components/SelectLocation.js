import React from "react";

const SelectLocation = ({
  data,
  placeHolder,
  isDisaled,
  selected,
  setSelected,
}) => {
  return (
    <select
      style={{ height: "50px", margin: "10px" }}
      value={selected}
      disabled={isDisaled}
      onChange={(e) => setSelected(e.target.value)}
    >
      <option value="" disabled>
        {placeHolder}
      </option>
      {data.map((item, idx) => (
        <option key={idx} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default SelectLocation;
