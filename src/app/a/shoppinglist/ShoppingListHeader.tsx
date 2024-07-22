import { Box, Button } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function ShoppingListHeader() {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link href="/a/shoppinglist/new" passHref>
        <Button variant="text" color="primary" component="a">
          Create new list
        </Button>
      </Link>
      <Button variant="contained" color="primary">
        Generate new list
      </Button>
    </Box>
  );
}
