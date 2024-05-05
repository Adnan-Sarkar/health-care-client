import { Box, List, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { generateDrawerItems } from "@/utils/generateDrawerItems";
import { TUserRole } from "@/types/index.types";
import SidebarItem from "./SidebarItem";
import { getUserInfo } from "@/services/auth.services";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [userRole, setUserRole] = useState("");
  const { role } = getUserInfo() as any;

  useEffect(() => {
    setUserRole(role);
  }, [role]);

  return (
    <Box>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
        sx={{
          py: 1,
          mt: 1,
        }}
      >
        <Image src={assets.svgs.logo} alt="Helth Care" width={30} height={30} />
        <Typography component={Link} href="/" variant="h5" fontWeight={600}>
          <Box component={"span"} color={"primary.main"}>
            H
          </Box>
          ealth{" "}
          <Box component={"span"} color={"primary.main"}>
            C
          </Box>
          are
        </Typography>
      </Stack>
      {
        <List>
          {generateDrawerItems(userRole as TUserRole).map((item) => (
            <SidebarItem key={item.title} item={item} />
          ))}
        </List>
      }
    </Box>
  );
};

export default Sidebar;
