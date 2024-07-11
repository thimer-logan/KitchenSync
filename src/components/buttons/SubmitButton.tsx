"use client";

import { Button, ButtonProps, SxProps, Theme } from "@mui/material";
import React from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends ButtonProps {
  text: string;
}

export default function SubmitButton({ text, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={pending}
      {...props}
    >
      {text}
    </Button>
  );
}
