import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import assets from "@/assets";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  return (
    <Container>
      <Stack
        sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            maxWidth: "600px",
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image src={assets.svgs.logo} alt="logo" width={50} height={50} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Login Health Care
              </Typography>
            </Box>
          </Stack>
          <Box>
            <form>
              <Grid container spacing={3} my={1}>
                <Grid item sm={6}>
                  <TextField
                    variant="outlined"
                    label={"Email"}
                    type="email"
                    size="small"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    variant="outlined"
                    label={"Password"}
                    type="password"
                    size="small"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
              <Typography mb={1} textAlign={"end"} component="p" fontWeight={300}>
                Forgot Password?
              </Typography>
              <Button fullWidth sx={{ my: 2 }}>
                Login
              </Button>
              <Typography component="p" fontWeight={300}>
              Don&apos;t have an account?{" "}
                <Link href="/register">
                  <Typography
                    component="span"
                    fontWeight={500}
                    sx={{ color: "primary.main" }}
                  >
                    Create an account
                  </Typography>
                </Link>
              </Typography>
            </form>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
