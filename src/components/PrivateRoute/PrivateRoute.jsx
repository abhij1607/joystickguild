import { SideNav } from "components/SideNav/SideNav";
import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { Grid, Paper, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

export const PrivateRoute = () => {
  const token = useSelector((store) => store.authDetails);
  const location = useLocation();

  return token ? (
    <Container
      maxWidth="lg"
      sx={{
        mt: "1rem",
      }}
      align="center"
    >
      <Grid
        container
        spacing={1}
        maxWidth="lg"
        sx={{
          mt: "1rem",
        }}
      >
        <Grid item xs>
          <Item>
            <SideNav />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Outlet />
          </Item>
        </Grid>
        <Grid item xs>
          <Item>Who to follow</Item>
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
