import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export const Signup = () => {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Typography variant="h5" component="h1" color="primary">
            Signup for JoystickGuild
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Connect with video-game enthusiast around the planet!
          </Typography>
        </Grid>
        <form>
          <TextField fullWidth label="First Name" />
          <TextField fullWidth label="Last Name" />
          <TextField fullWidth label="Email" />
          <TextField fullWidth label="Password" />
          <TextField fullWidth label="Confirm Password" />

          <Button
            style={{ marginTop: "10px" }}
            type="submit"
            align="center"
            variant="contained"
            color="primary"
            fullWidth
          >
            Sign Up
          </Button>
        </form>
        <Typography>
          Already have an account
          <Link to="/login">Sign In</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};
