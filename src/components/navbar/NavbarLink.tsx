import { NextRouter } from "next/router";
import Link, { LinkProps } from "next/link";
import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "@/types/navigation";
import { usePathname } from "next/navigation";

type NavbarLinkProps = LinkProps & {
  link: NavLink;
  className?: string;
  activeClassName?: string;
};

export default function NavbarLink({
  link,
  className,
  activeClassName,
  children,
  ...props
}: PropsWithChildren<NavbarLinkProps>) {
  const pathname = usePathname();
  const actualClassName = `${className}  ${
    pathname === link.link ? activeClassName : ""
  }`;

  return (
    <Link key={link.name} passHref className={actualClassName} {...props}>
      <ListItem key={link.name} disablePadding>
        <ListItemButton
          sx={{
            backgroundColor: pathname === link.link ? "rgba(0, 0, 0, 0.4)" : "",
          }}
        >
          <ListItemIcon>
            <link.Icon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary={link.name} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
}
