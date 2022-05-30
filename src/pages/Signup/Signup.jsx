import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleFormChange } from "utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../firebase/firebase-auth";

export const Signup = () => {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const { firstName, lastName, email, password, confirmPassword } = formData;
  const isSignupStatus = useSelector(
    (store) => store.authDetails.isSignupStatus
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(signup(formData));
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
            Signup for JoystickGuild
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Connect with video-game enthusiast around the planet!
          </Typography>
        </Grid>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            value={firstName}
            name="firstName"
            onChange={(e) => handleFormChange(e, setFormData)}
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            value={lastName}
            name="lastName"
            onChange={(e) => handleFormChange(e, setFormData)}
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            name="email"
            onChange={(e) => handleFormChange(e, setFormData)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            name="password"
            onChange={(e) => handleFormChange(e, setFormData)}
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={(e) => handleFormChange(e, setFormData)}
            required
          />
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
