import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import facebookIcon from "@/assets/landing_page/facebook.png";
import instagramIcon from "@/assets/landing_page/instagram.png";
import linkedinIcon from "@/assets/landing_page/linkedin.png";
import twitterIcon from "@/assets/landing_page/twitter.png";

const Footer = () => {
  return (
    <Box bgcolor="rgb(17,26,34)" py={5}>
      <Container>
        <Stack
          direction={"row"}
          gap={4}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography color={"#fff"} component={Link} href="/">
            Consultation
          </Typography>
          <Typography color={"#fff"} component={Link} href="/">
            Health Plans
          </Typography>
          <Typography color={"#fff"} component={Link} href="/">
            Medicine
          </Typography>
          <Typography color={"#fff"} component={Link} href="/">
            Diagnostics
          </Typography>
          <Typography color={"#fff"} component={Link} href="/">
            NGOs
          </Typography>
        </Stack>

        <Stack
          direction={"row"}
          gap={4}
          alignItems={"center"}
          justifyContent={"center"}
          py={3}
        >
          <Image src={facebookIcon} alt="facebook" width={30} height={30} />
          <Image src={instagramIcon} alt="instagram" width={30} height={30} />
          <Image src={linkedinIcon} alt="linkedin" width={30} height={30} />
          <Image src={twitterIcon} alt="twitter" width={30} height={30} />
        </Stack>
        <Box
          sx={{
            border: "1px dashed lightgray",
          }}
        ></Box>
        <Stack
          direction={"row"}
          gap={2}
          alignItems={"center"}
          justifyContent={"space-between"}
          py={3}
        >
          <Typography component="p" color={"#fff"}>
            &copy;2024 Health Care. All Rights Reserved.
          </Typography>
          <Typography
            color={"#fff"}
            component={Link}
            href="/"
            variant="h4"
            fontWeight={600}
          >
            <Box component={"span"} color={"primary.main"}>
              H
            </Box>
            ealth{" "}
            <Box component={"span"} color={"primary.main"}>
              C
            </Box>
            are
          </Typography>
          <Typography component="p" color={"#fff"}>
            Privacy Policy | Terms & Conditions
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
