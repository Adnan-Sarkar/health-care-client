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
import { loginUser } from "@/services/actions/loginUser";
import { toast } from "sonner";
import { storeUserInfo } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import CustomForm from "@/components/Forms/CustomForm";
import { FieldValues } from "react-hook-form";
import CustomInputField from "@/components/Forms/CustomInputField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const loginValidationSchema = z.object({
  email: z
    .string({
      required_error: "Please enter your email",
    })
    .email("Please enter valid email"),
  password: z
    .string({
      required_error: "Please enter your password",
    })
    .min(6, "Must be minimum 6 characters"),
});

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async (values: FieldValues) => {
    try {
      const res = await loginUser(values);
      if (res?.success) {
        toast.success(res.message);
        storeUserInfo(res?.data?.accessToken);
        router.push("/");
      } else {
        throw new Error(res?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
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
            <CustomForm
              resolver={zodResolver(loginValidationSchema)}
              onSubmit={handleLogin}
              defaultValues={{
                email: "",
                password: "",
              }}
            >
              <Grid container spacing={3} my={1}>
                <Grid item sm={6}>
                  <CustomInputField
                    variant="outlined"
                    label={"Email"}
                    type="email"
                    size="small"
                    fullWidth={true}
                    name="email"
                  />
                </Grid>
                <Grid item sm={6}>
                  <CustomInputField
                    variant="outlined"
                    label={"Password"}
                    type="password"
                    size="small"
                    fullWidth={true}
                    name="password"
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
            </CustomForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
