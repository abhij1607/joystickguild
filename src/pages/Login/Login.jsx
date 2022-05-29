import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Stack } from "@mui/material";

import { Link } from "react-router-dom";

const Login = () => {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Typography variant="h5" component="h1" color="primary">
            Login to JoystickGuild
          </Typography>
          <Typography variant="caption" gutterBottom>
            Please enter email and password to Login!
          </Typography>
        </Grid>
        <form>
          <TextField fullWidth label="Email" required />
          <TextField fullWidth label="Password" required />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember Me!"
            fullWidth
          />
          <Stack spacing={1}>
            <Button
              type="submit"
              align="center"
              variant="contained"
              color="primary"
              fullWidth
            >
              Login
            </Button>
            <Button
              type="submit"
              align="center"
              variant="outlined"
              color="primary"
              fullWidth
            >
              Login with Test Credentials
            </Button>
          </Stack>
        </form>
        <Typography>
          Don't have an account?
          <Link to="/signup">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export { Login };
