"use client";

import React from "react";
import { PacmanLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex justify-center items-center w-dvw h-dvh">
      <PacmanLoader color="#607D8B" />;
    </div>
  );
}
