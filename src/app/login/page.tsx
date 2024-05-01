"use client";

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
import { useForm, SubmitHandler } from "react-hook-form";
import { loginUser } from "@/services/actions/loginUser";
import { toast } from "sonner";

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    try {
      const res = await loginUser(values);
      if (res?.success) {
        toast.success(res.message);
        // router.push("/login");
      } else {
        throw new Error(res?.message);
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3} my={1}>
                <Grid item sm={6}>
                  <TextField
                    variant="outlined"
                    label={"Email"}
                    type="email"
                    size="small"
                    fullWidth={true}
                    {...register("email")}
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    variant="outlined"
                    label={"Password"}
                    type="password"
                    size="small"
                    fullWidth={true}
                    {...register("password")}
                  />
                </Grid>
              </Grid>
              <Typography
                mb={1}
                textAlign={"end"}
                component="p"
                fontWeight={300}
              >
                Forgot Password?
              </Typography>
              <Button type="submit" fullWidth sx={{ my: 2 }}>
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
