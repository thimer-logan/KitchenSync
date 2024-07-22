"use client";

import { StorageItem } from "@/types/storage";
import { Checkbox, styled, Typography } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import React from "react";
import NumberInput from "../../inputs/NumericInput";

interface StorageItemListItemProps {
  storageItem: StorageItem;
  onQuantityChange: (quantity: number) => void;
  checkable?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export default function StorageItemListItem({
  storageItem,
  onQuantityChange,
  checkable = false,
  checked = false,
  onCheckedChange,
}: //onDelete,
StorageItemListItemProps) {
  const { name, quantity, unit } = storageItem;

  const handleQuantityChange = (quantity: number | null) => {
    if (quantity === null) return;

    onQuantityChange(quantity);
  };

  const handleCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onCheckedChange) return;
    onCheckedChange(event.target.checked);
  };

  return (
    <li className="flex justify-between items-center border-b-2 border-solid border-primary py-2 px-0 mb-2 mx-0">
      <div className="flex flex-row justify-between items-center gap-4 flex-grow">
        <div className="flex flex-row items-center gap-2">
          {checkable && (
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
              style={{ marginRight: 8 }}
              checked={checked}
              onChange={handleCheckedChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          )}
          <Typography
            variant="body1"
            className={`mt-0 mr-0 mb-2 ml-0 break-words ${
              checked ? "line-through" : ""
            }`}
          >
            {name}
          </Typography>
        </div>
        <div className="flex flex-row justify-end items-center">
          <NumberInput
            aria-label="Quantity Input"
            value={quantity}
            min={0}
            //endAdornment={<InputAdornment>{unit}</InputAdornment>}
            onChange={(event, val) => {
              event.preventDefault();
              handleQuantityChange(val);
            }}
          />
          <Typography variant="body2" sx={{ minWidth: 40, marginLeft: 2 }}>
            {unit}
          </Typography>
        </div>
      </div>
    </li>
  );
}

const InputAdornment = styled("div")(
  ({ theme }) => `
  margin: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  grid-row: 1/3;
  color: #434D5B;
`
);
