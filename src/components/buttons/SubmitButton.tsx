"use client";

import { Button, SxProps, Theme } from "@mui/material";
import React from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  text: string;
  className?: string;
  sx?: SxProps<Theme> | undefined;
}

export default function SubmitButton({
  text,
  className,
  sx,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={pending}
      className={className}
      sx={sx}
    >
      {text}
    </Button>
  );
}
