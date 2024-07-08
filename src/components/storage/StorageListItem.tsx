"use client";

import { StorageItem } from "@/types/storage";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Card,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import Fade from "@mui/material/Fade";
import Link from "next/link";
import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import storageIconMapping from "@/constants/iconMapping";
import { deleteStorageItem } from "@/app/a/storage/actions";

const getIconByName = (ingredientName: string): React.ReactElement => {
  const IconComponent =
    storageIconMapping[ingredientName.toLowerCase()] ||
    storageIconMapping.default;
  return <IconComponent size={24} />;
};

interface StorageListItemProps {
  item: StorageItem;
}

export default function StorageListItem({ item }: StorageListItemProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [stopScroll, setStopScroll] = useState(false);
  const swipeHandlers = useSwipeable({
    onSwipeStart: () => setStopScroll(true),
    onSwiped: () => setStopScroll(false),
  });

  const handleAction = (actionName: string) => {
    if (actionName === "Delete") {
      deleteStorageItem(item.id);
    } else if (actionName === "Add to shopping list") {
      console.log("Add to shopping list");
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
    <Card variant="outlined" sx={{ margin: 2 }} {...swipeHandlers}>
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
          >
            <MoreHorizIcon />
          </IconButton>
        }
      >
        <Link href={`/a/storage/${item.id}`} passHref className="grow">
          <ListItemButton>
            <ListItemIcon>{getIconByName(item.name)}</ListItemIcon>
            <ListItemText
              primary={item.name}
              secondary={item.description}
              primaryTypographyProps={{ variant: "h6" }}
            />
            <ListItemText
              primary={`${item.quantity} ${item.unit}`}
              sx={{ textAlign: "right", marginRight: 4 }}
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
          key="add-to-shopping-list"
          onClick={() => handleAction("Add to shopping list")}
        >
          <Link href={`/a/storage/${item.id}/add-to-list`}>
            <ListItemIcon>
              <ShoppingCartCheckoutIcon />
            </ListItemIcon>
            Add to shopping list
          </Link>
        </MenuItem>
        <MenuItem key="delete-item" onClick={() => handleAction("Delete")}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
}
