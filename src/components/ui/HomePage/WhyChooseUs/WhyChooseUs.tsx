import assets from "@/assets";
import { Box, Container, Grid, Typography } from "@mui/material";
import chooseUsImg from "@/assets/choose-us.png";
import Image from "next/image";

const servicesData = [
  {
    imageSrc: assets.svgs.award,
    title: "Award Winning Service",
    description:
      "Duas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui offici",
  },
  {
    imageSrc: assets.svgs.award,
    title: "Best Quality Pregnancy Care",
    description:
      "Duas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui offici",
  },
  {
    imageSrc: assets.svgs.award,
    title: "Complete Medical Equipments",
    description:
      "Duas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui offici",
  },
  {
    imageSrc: assets.svgs.award,
    title: "Dedicated Emergency Care",
    description:
      "Duas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui offici",
  },
];

const WhyChooseUs = () => {
  return (
    <Container>
      <Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            color={"primary"}
            variant="h6"
            component={"h1"}
            fontWeight={700}
          >
            Why Us
          </Typography>
          <Typography variant="h4" component={"h1"} fontWeight={700}>
            Why Choose Us
          </Typography>
        </Box>
        <Grid container spacing={2} my={5}>
          <Grid item md={6}>
            {servicesData?.map((service, index) => {
              if (index % 2 === 0) {
                return (
                  <Box
                    key={service.title}
                    sx={{
                      display: "flex",
                      gap: "15px",
                      backgroundColor: "rgba(245,245,245,1)",
                      padding: "15px",
                      alignItems: "center",
                      borderRadius: "10px 10px 100px 10px",
                      margin: "20px 0",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#fff",
                        padding: "10px",
                        borderRadius: "10px",
                      }}
                    >
                      <Image
                        src={service.imageSrc}
                        alt="award"
                        width={50}
                        height={50}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        component={"h6"}
                        fontWeight={600}
                      >
                        {service.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color={"primry.body1"}
                        fontWeight={300}
                      >
                        {service.description}
                      </Typography>
                    </Box>
                  </Box>
                );
              } else {
                return (
                  <Box
                    key={service.title}
                    sx={{
                      display: "flex",
                      gap: "15px",
                      backgroundColor: "rgba(245,245,245,1)",
                      padding: "15px",
                      alignItems: "center",
                      borderRadius: "10px 100px 10px 10px",
                      margin: "20px 0",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#fff",
                        padding: "10px",
                        borderRadius: "10px",
                      }}
                    >
                      <Image
                        src={service.imageSrc}
                        alt="award"
                        width={50}
                        height={50}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        component={"h6"}
                        fontWeight={600}
                      >
                        {service.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color={"primry.body1"}
                        fontWeight={300}
                      >
                        {service.description}
                      </Typography>
                    </Box>
                  </Box>
                );
              }
            })}
          </Grid>
          <Grid item md={6}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Image src={chooseUsImg} width={400} alt="why choose us" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default WhyChooseUs;
