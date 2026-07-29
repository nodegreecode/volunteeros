import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  CardMedia,
  Chip,
  Paper,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ScheduleIcon from "@mui/icons-material/Schedule";
import WorkIcon from "@mui/icons-material/Work";
import GroupsIcon from "@mui/icons-material/Groups";
import CampaignIcon from "@mui/icons-material/Campaign";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import AssessmentIcon from "@mui/icons-material/Assessment";

import Groups from "@mui/icons-material/Groups";
import Business from "@mui/icons-material/Business";
import AccessTime from "@mui/icons-material/AccessTime";
import LocationCity from "@mui/icons-material/LocationCity";
import StarIcon from "@mui/icons-material/Star";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import BusinessIcon from "@mui/icons-material/Business";
import hero1 from "@/assets/hero.jpg";
import hero2 from "@/assets/brian-yurasit.jpg";
import hero3 from "@/assets/ny-menghor.jpg";
import hero4 from "@/assets/ocg-saving-the-ocean.jpg";
import beachCleaning from "@/assets/ocg-saving-the-ocean2.jpg";
import foodDonation from "@/assets/joel-muniz.jpg";
import teaching from "@/assets/aleksandar-andreev-mGX9sIxB0x8-unsplash.jpg";
import treePlanting from "@/assets/dmitry-dreyer-gHho4FE4Ga0-unsplash.jpg";
import age from "@/assets/age-cymru-bSXk1lOp8T0-unsplash.jpg";
import animal from "@/assets/liao-je-wei-x5nzG2-UF_E-unsplash.jpg";

import Counter from "@/utils/SttatsCounter.tsx";

const heroes = [hero1, hero2, hero3, hero4];

const categories = [
  "Education",
  "Healthcare",
  "Environment",
  "Animals",
  "Community",
  "Disaster Relief",
];

const benefits = [
  {
    title: "Easy to Join",
    icon: <PersonAddIcon fontSize="large" />,
  },
  {
    title: "Flexible Scheduling",
    icon: <ScheduleIcon fontSize="large" />,
  },
  {
    title: "Build Your Resume",
    icon: <WorkIcon fontSize="large" />,
  },
  {
    title: "Grow Your Network",
    icon: <GroupsIcon fontSize="large" />,
  },
];

const organizationBenefits = [
  {
    title: "Reach More Volunteers",
    icon: <CampaignIcon fontSize="large" />,
  },
  {
    title: "Simple Management",
    icon: <ManageAccountsIcon fontSize="large" />,
  },
  {
    title: "Volunteer Tracking",
    icon: <TrackChangesIcon fontSize="large" />,
  },
  {
    title: "Analytics Dashboard",
    icon: <AssessmentIcon fontSize="large" />,
  },
];

const statsData = [
  {
    icon: <Groups fontSize="large" />,
    value: 10000,
    label: "Volunteers",
  },
  {
    icon: <Business fontSize="large" />,
    value: 800,
    label: "Organizations",
  },
  {
    icon: <AccessTime fontSize="large" />,
    value: 25000,
    label: "Volunteer Hours",
  },
  {
    icon: <LocationCity fontSize="large" />,
    value: 150,
    label: "Cities",
  },
];

const testimonials = [
  {
    name: "Jane Doe",
    role: "Volunteer",
    rating: 5,
    comment:
      "Great platform for finding volunteer opportunities. The registration process was simple, and I quickly found meaningful ways to contribute.",
  },
  {
    name: "Helping Hands NGO",
    role: "Organization",
    rating: 5,
    comment:
      "We recruited dozens of volunteers within days. Managing applications and communicating with volunteers has never been easier.",
  },
  {
    name: "John Smith",
    role: "Volunteer",
    rating: 5,
    comment:
      "I've participated in multiple community events through this platform. Highly recommended for anyone wanting to give back.",
  },
  {
    name: "Sarah Johnson",
    role: "Community Coordinator",
    rating: 4,
    comment:
      "The platform made it easy to connect with dedicated volunteers. We've successfully organized several local events thanks to the enthusiastic community.",
  },
  {
    name: "Michael Brown",
    role: "Volunteer",
    rating: 5,
    comment:
      "I met amazing people while supporting local charities. The platform is intuitive and makes signing up for events effortless.",
  },
  {
    name: "Green Future Foundation",
    role: "Non-Profit Organization",
    rating: 5,
    comment:
      "VolunteerHub has transformed how we recruit volunteers. Our events now fill much faster, allowing us to focus on creating greater community impact.",
  },
];

export default function LandingPage() {
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroes.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {/* HERO */}
      <Box
        sx={{
          height: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
        component="section"
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${heroes[currentHero]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transition: "opacity 1.5s ease-in-out",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.45)",
          }}
        />
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              maxWidth: 600,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                color: "grey.200",
              }}
            >
              Find meaningful opportunities
            </Typography>

            <Typography
              variant="h6"

              sx={{
                mt: 3,
                color: "white",
              }}
            >
              Connect with organizations, make an impact, and build your
              experience through volunteering.
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                mt: 4,
              }}
            >
              <Button variant="contained" size="large">
                Find Opportunities
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  color: "white",
                  borderColor: "white",
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Register Organization
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* HOW OT WORKS */}
      <Box
        id="how-it-works"
        sx={{
          py: 8,
        }}
        component="section"
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              mb: 4,
            }}
          >
            <Typography variant="h3">How It Works</Typography>
            <Typography component="p">
              Here you can find how it works
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Avatar>1</Avatar>
                  <Typography variant="h6" gutterBottom>
                    For Volunteers
                  </Typography>
                  <Typography color="text.secondary">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                    ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Avatar>2</Avatar>
                  <Typography variant="h6" gutterBottom>
                    For Organizations
                  </Typography>
                  <Typography color="text.secondary">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                    ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* WHY CHOOSE OUT PLATFORM*/}
      <Box
        id="why-choose"
        sx={{
          py: 4,
        }}
        component="section"
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              mb: 4,
            }}
          >
            <Typography variant="h3">Why Choose Our Platform</Typography>
            <Typography component="p">
              Here you can learn about our features
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card>
                <CardContent>
                  <Avatar>1</Avatar>
                  <Typography variant="h6" gutterBottom>
                    Projects
                  </Typography>
                  <Typography color="text.secondary">
                    Easy Project Discovery
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card>
                <CardContent>
                  <Avatar>2</Avatar>
                  <Typography variant="h6" gutterBottom>
                    Participation
                  </Typography>
                  <Typography color="text.secondary">
                    Manage Applications
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card>
                <CardContent>
                  <Avatar>3</Avatar>
                  <Typography variant="h6" gutterBottom>
                    Verified Organizations
                  </Typography>
                  <Typography color="text.secondary">
                    Trusted nonprofits.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card>
                <CardContent>
                  <Avatar>4</Avatar>
                  <Typography variant="h6" gutterBottom>
                    Projects
                  </Typography>
                  <Typography color="text.secondary">
                    Easy Project Discovery
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* VOLUNTEERS OPPORTUNITIES */}
      <Box
        id="vol-opportunities"
        sx={{
          py: 8,
        }}
        component="section"
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              mb: 4,
            }}
          >
            <Typography variant="h3">Volunteers Opportunities</Typography>
          </Box>
          <Grid container spacing={4}>
            {/* CARD */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={beachCleaning}
                  alt="volunteer activity"
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                    }}
                  >
                    Beach Cleanup
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      mb: 1,
                    }}
                  >
                    <Chip label="Berlin" icon={<LocationOnIcon />} />
                    <Chip label="July 20, 2026" icon={<CalendarMonthIcon />} />
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Help clean local beaches and protect marine life.
                  </Typography>

                  <Typography variant="subtitle2">
                    Organized by Green Earth NGO
                  </Typography>

                  <Button variant="contained" sx={{ mt: 2 }}>
                    View Opportunity
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            {/* CARD */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={foodDonation}
                  alt="volunteer activity"
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                    }}
                  >
                    Food Donation Drive
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      mb: 1,
                    }}
                  >
                    <Chip label="Berlin" icon={<LocationOnIcon />} />
                    <Chip label="July 20, 2026" icon={<CalendarMonthIcon />} />
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Support communities by distributing food.
                  </Typography>

                  <Typography variant="subtitle2">
                    Organized by Green Earth NGO
                  </Typography>

                  <Button variant="contained" sx={{ mt: 2 }}>
                    View Opportunity
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            {/* CARD */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={teaching}
                  alt="volunteer activity"
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                    }}
                  >
                    Teaching Support
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      mb: 1,
                    }}
                  >
                    <Chip label="Berlin" icon={<LocationOnIcon />} />
                    <Chip label="July 20, 2026" icon={<CalendarMonthIcon />} />
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Help students with educational programs.
                  </Typography>

                  <Typography variant="subtitle2">
                    Organized by Green Earth NGO
                  </Typography>

                  <Button variant="contained" sx={{ mt: 2 }}>
                    View Opportunity
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            {/* CARD */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={treePlanting}
                  alt="volunteer activity"
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                    }}
                  >
                    Tree Planting Initiative
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      mb: 1,
                    }}
                  >
                    <Chip label="Berlin" icon={<LocationOnIcon />} />
                    <Chip label="July 20, 2026" icon={<CalendarMonthIcon />} />
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Join local volunteers to plant trees and create greener
                    communities.
                  </Typography>

                  <Typography variant="subtitle2">
                    Organized by Green Earth NGO
                  </Typography>

                  <Button variant="contained" sx={{ mt: 2 }}>
                    View Opportunity
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            {/* CARD */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={age}
                  alt="volunteer activity"
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                    }}
                  >
                    Elderly Support Program
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      mb: 1,
                    }}
                  >
                    <Chip label="Berlin" icon={<LocationOnIcon />} />
                    <Chip label="July 20, 2026" icon={<CalendarMonthIcon />} />
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Spend time with seniors by providing companionship and
                    helping with daily activities.
                  </Typography>

                  <Typography variant="subtitle2">
                    Organized by Green Earth NGO
                  </Typography>

                  <Button variant="contained" sx={{ mt: 2 }}>
                    View Opportunity
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            {/* CARD */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={animal}
                  alt="volunteer activity"
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                    }}
                  >
                    Animal Shelter Assistance
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      mb: 1,
                    }}
                  >
                    <Chip label="Berlin" icon={<LocationOnIcon />} />
                    <Chip label="July 20, 2026" icon={<CalendarMonthIcon />} />
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Help care for rescued animals and support shelter
                    operations.
                  </Typography>

                  <Typography variant="subtitle2">
                    Organized by Green Earth NGO
                  </Typography>

                  <Button variant="contained" sx={{ mt: 2 }}>
                    View Opportunity
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* CATEGORIES */}
      <Box
        id="categories"
        sx={{
          py: 6,
        }}
        component="section"
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              mb: 4,
            }}
          >
            <Typography variant="h3">Explore Categories</Typography>
          </Box>
          <Grid container spacing={3}>
            {/* CARD */}
            {categories.map((category) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                  }}
                >
                  <CardContent
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6">{category}</Typography>
                  </CardContent>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* WHY VOLUNTEEROS */}
      <Box
        sx={{
          py: 8,
          backgroundColor: "#f8f9fa",
        }}
        component="section"
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              mb: 5,
            }}
          >
            <Typography variant="h3">
              Why Volunteers Love VolunteerOS
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {/* CARD */}
            {benefits.map((benefit) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={benefit.title}>
                <Card
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    borderRadius: 3,
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ py: 5 }}>
                    <Box>{benefit.icon}</Box>
                    <Typography variant="h6">{benefit.title}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* WHY ORGANIZATIONS LOVE IT */}
      <Box
        sx={{
          py: 8,
          //backgroundColor: "#f8f9fa",
        }}
        component="section"
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              mb: 5,
            }}
          >
            <Typography variant="h3">
              Why Organizations Love VolunteerOS
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {/* CARD */}
            {organizationBenefits.map((benefit) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={benefit.title}>
                <Card
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    borderRadius: 3,
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ py: 5 }}>
                    <Box>{benefit.icon}</Box>
                    <Typography variant="h6">{benefit.title}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* STATISTICS */}
      <Box
        id="statistics"
        sx={{
          py: 10,
          backgroundColor: "#f8fafc",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              mb: 5,
            }}
          >
            <Typography variant="h3">Our Impact</Typography>

            <Typography variant="body1" color="text.secondary">
              Together, we are creating meaningful change across communities.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {statsData.map((stat, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card
                  elevation={3}
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 4,
                    transition: "0.3s",

                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 8,
                    },
                  }}
                >
                  <Box
                    sx={{
                      color: "primary.main",
                      mb: 2,
                    }}
                  >
                    {stat.icon}
                  </Box>

                  <Typography variant="h3" color="primary">
                    <Counter value={stat.value} />
                  </Typography>

                  <Typography variant="h6" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* TESTIMONIALS */}
      <Box
        id="testimonials"
        sx={{
          py: 10,
          bgcolor: "grey.100",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              mb: 5,
            }}
          >
            <Typography variant="h3">What Our Community Says</Typography>

            <Typography color="text.secondary">
              Hear from volunteers and organizations making a difference.
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card
                  sx={{
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        fontStyle: "italic",
                        mb: 3,
                      }}
                    >
                      "{testimonial.comment}"
                    </Typography>

                    <Box>
                      {[...Array(testimonial.rating)].map((_, index) => (
                        <StarIcon color="warning" key={index} />
                      ))}
                    </Box>

                    <Box>
                      <Avatar sx={{ mr: 2 }}>
                        {testimonial.name.charAt(0)}
                      </Avatar>

                      <Box>
                        <Typography>{testimonial.name}</Typography>

                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* CALL TO ACTION */}
      <Box
        id="call-to-action"
        sx={{
          py: 10,
          ///bgcolor: "primary.main",
          // color: "primary.contrastText",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="h3">Ready to Make a Difference?</Typography>

            <Typography
              variant="h6"
              sx={{
                opacity: 0.9,
                mb: 5,
              }}
            >
              Join thousands of volunteers and organizations creating positive
              change every day.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{
                justifyContent: "center",
              }}
            >
              <Button
                component={Link}
                to="/auth/signup"
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<VolunteerActivismIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                }}
              >
                Join as Volunteer
              </Button>

              <Button
                variant="contained"
                size="large"
                startIcon={<BusinessIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  color: "common.white",
                  borderColor: "common.white",
                  /*  "&:hover": {
                    borderColor: "common.white",
                    bgcolor: "rgba(255,255,255,0.08)",
                  },*/
                }}
              >
                Register Organization
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}
