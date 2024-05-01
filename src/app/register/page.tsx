import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
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
                Patient Registration
              </Typography>
            </Box>
          </Stack>
          <Box>
            <form>
              <Grid container spacing={3} my={1}>
                <Grid item sm={12}>
                  <TextField
                    variant="outlined"
                    label={"Name"}
                    size="small"
                    fullWidth={true}
                  />
                </Grid>
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
                <Grid item sm={6}>
                  <TextField
                    variant="outlined"
                    label={"Contact Number"}
                    type="tel"
                    size="small"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    variant="outlined"
                    label={"Address"}
                    size="small"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
              <Button fullWidth sx={{ my: 2 }}>
                Register
              </Button>
              <Typography component="p" fontWeight={300}>
                Do you already have an account?{" "}
                <Link href="/login">
                  <Typography
                    component="span"
                    fontWeight={500}
                    sx={{ color: "primary.main" }}
                  >
                    Login
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

export default RegisterPage;
