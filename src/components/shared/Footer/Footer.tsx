import { Box, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

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
      </Container>
    </Box>
  );
};

export default Footer;
