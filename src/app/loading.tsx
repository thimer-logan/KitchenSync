"use client";

import React from "react";
import { PacmanLoader } from "react-spinners";

export default function Loading() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PacmanLoader color="#607D8B" />;
    </div>
  );
}
