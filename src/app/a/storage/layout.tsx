import { Box } from "@mui/material";

export default function StorageLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <Box component="div">
      {children}
      {modal}
    </Box>
  );
}
