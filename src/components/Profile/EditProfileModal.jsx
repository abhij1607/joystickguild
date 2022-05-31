import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Stack } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  margin: "10px 0",
};

export const EditProfileModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        Edit profile
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Profile
          </Typography>
          <form>
            <Card
              sx={{
                marginBottom: "10px",
                paddingBottom: "75px",
                boxShadow: "none",
                position: "relative",
              }}
            >
              <Box>
                <CardMedia
                  component="img"
                  height="160"
                  image="https://picsum.photos/seed/picsum/556/140"
                  alt="green iguana"
                />
                <label
                  htmlFor="cover"
                  style={{
                    position: "absolute",
                    top: "40%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <AddBoxIcon />
                  <input
                    type="file"
                    accept="image/*"
                    aria-label="Select cover Picture"
                    name="cover"
                    id="cover"
                    hidden
                  />
                </label>
              </Box>
              <Box
                sx={{
                  display: "inline-flex",
                  position: "absolute",
                  bottom: "15px",
                  justifyContent: "space-between",
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="https://picsum.photos/800"
                  sx={{ width: 152, height: 152 }}
                />
                <label
                  htmlFor="profile"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <AddBoxIcon />
                  <input
                    type="file"
                    accept="image/*"
                    aria-label="Select Profile Picture"
                    name="profile"
                    id="profile"
                    hidden
                  />
                </label>
              </Box>
            </Card>
            <Stack spacing={2}>
              <TextField
                label="First Name"
                variant="outlined"
                name="firstName"
                fullWidth
              />
              <TextField
                label="Last Name"
                variant="outlined"
                name="LastName"
                fullWidth
              />
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                fullWidth
              />
              <TextField
                label="Website"
                variant="outlined"
                name="website"
                fullWidth
              />
              <TextField label="Bio" variant="outlined" name="bio" fullWidth />
            </Stack>
            <Stack direction="row" spacing={4} mt={2}>
              <Button
                type="submit"
                align="center"
                variant="contained"
                color="primary"
              >
                Save
              </Button>
              <Button
                onClick={handleClose}
                align="center"
                variant="outlined"
                color="primary"
              >
                Cancel
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
