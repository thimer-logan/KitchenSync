import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StorageHeader from "./StorageHeader";
import Link from "next/link";

export default function StorageLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <Box component="div">
      <StorageHeader />
      {children}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 8, right: 8 }}
      >
        <Link href="/a/storage/new" passHref>
          <AddIcon />
        </Link>
      </Fab>
      {modal}
    </Box>
  );
}
