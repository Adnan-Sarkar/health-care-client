"use client";

import { DrawerItem } from "@/types/index.types";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarItem = ({ item }: { item: DrawerItem }) => {
  const pathName = usePathname();
  const linkPath = `/dashboard/${item.path}`;
  console.log(pathName);
  console.log(linkPath);
  return (
    <Link href={linkPath}>
      <ListItem
        key={item.title}
        disablePadding
        sx={{
          ...(pathName === linkPath
            ? {
                borderRight: "3px solid #1586FD",
                "& svg": { color: "primary.main" },
                "& span": { color: "primary.main", fontWeight: 500 },
              }
            : {}),
          mb: 1,
        }}
      >
        <ListItemButton>
          <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarItem;
