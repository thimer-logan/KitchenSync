"use client";

import { ShoppingList } from "@/types/shopping-list";
import {
  Box,
  Card,
  Chip,
  Fade,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { stores } from "@/constants/storeImageMapping";
import {
  deleteShoppingList,
  markShoppingListAsComplete,
} from "@/app/a/shoppinglist/actions";

interface ShoppingListListItemProps {
  shoppingList: ShoppingList;
}

export default function ShoppingListListItem({
  shoppingList: item,
}: ShoppingListListItemProps) {
  const numVisibleChips = Math.min(2, item.items.length);
  const hiddenItemCount = item.items.length - numVisibleChips;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const imageUrl =
    stores.find(
      (store) => store.name.toLowerCase() === item.store?.toLowerCase()
    )?.image || "";

  const handleAction = async (actionName: string) => {
    if (actionName === "delete") {
      await deleteShoppingList(item.id);
    } else if (actionName === "edit") {
    } else if (actionName === "confirm") {
      await markShoppingListAsComplete(item.id);
    }

    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <Card
      variant="outlined"
      sx={{ margin: 2, boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)" }}
    >
      <ListItem
        key={item.id}
        disablePadding
        sx={{ overflowY: "visible" }}
        secondaryAction={
          <IconButton
            id="more-button"
            edge="end"
            aria-controls={open ? "more-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleOpen}
            disabled={item.completed}
          >
            <MoreHorizIcon />
          </IconButton>
        }
      >
        <Link href={`/a/shoppinglist/${item.id}`} passHref className="grow">
          <ListItemButton>
            <Image src={imageUrl} alt={item.name} width={48} height={48} />
            <ListItemText
              primary={item.name}
              secondary={
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 0.5,
                  }}
                >
                  {item.items.slice(0, numVisibleChips).map((item) => (
                    <Chip
                      key={item.storageItem.id}
                      label={item.storageItem.name}
                    />
                  ))}
                  {hiddenItemCount > 0 && (
                    <Chip label={`+ ${hiddenItemCount} more`} />
                  )}
                </Box>
              }
              primaryTypographyProps={{ variant: "h6" }}
              sx={{ paddingLeft: 2 }}
            />
          </ListItemButton>
        </Link>
      </ListItem>
      <Menu
        id="more-menu"
        MenuListProps={{
          "aria-labelledby": "more-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          key="confirm-shopping-list"
          onClick={() => handleAction("confirm")}
        >
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          Confirm Shopping List
        </MenuItem>
        <MenuItem key="edit-item">
          <Link
            href={`/a/shoppinglist/${item.id}/edit`}
            passHref
            className="grow"
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            Edit
          </Link>
        </MenuItem>
        <MenuItem key="delete-item" onClick={() => handleAction("delete")}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
}
