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
import { Link, useNavigate } from "react-router-dom";
import { handleFormChange } from "utils/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../firebase/firebase-auth";

const Login = () => {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const initialFormData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const { email, password } = formData;
  const fillTestCredentials = (e) => {
    e.preventDefault();
    const testCredentials = { email: "abhi@gmail.com", password: "abhi123" };
    setFormData(testCredentials);
  };

  const isLoginStatus = useSelector((store) => store.authDetails.isLoginStatus);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(login(formData));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

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
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => handleFormChange(e, setFormData)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => handleFormChange(e, setFormData)}
            required
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember Me!"
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
              type="button"
              align="center"
              variant="outlined"
              color="primary"
              onClick={fillTestCredentials}
              fullWidth
            >
              Login with Test Credentials
            </Button>
          </Stack>
        </form>
        <Typography>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export { Login };
