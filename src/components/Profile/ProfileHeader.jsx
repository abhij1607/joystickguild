import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Link } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { EditProfileModal } from "components/Profile/EditProfileModal";
import { useSelector } from "react-redux";
export const ProfileHeader = () => {
  const {
    userDetails: {
      userData: {
        firstName,
        lastName,
        email,
        bio,
        website,
        coverPicture,
        profilePicture,
      },
    },
  } = useSelector((store) => store.userDetails);
  return (
    <>
      <Card style={{ boxShadow: "none" }}>
        <CardMedia
          component="img"
          height="160"
          image={coverPicture || "https://picsum.photos/seed/picsum/556/140"}
          alt="cover picture"
        />
        <CardContent>
          <Box
            sx={{
              display: "inline-flex",
              position: "absolute",
              top: "95px",
              justifyContent: "space-between",
            }}
          >
            <Avatar
              alt={firstName}
              src={profilePicture}
              sx={{ width: 152, height: 152 }}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row-reverse" }} mb={2}>
            <EditProfileModal />
          </Box>

          <Typography variant="h5" component="div">
            {firstName + " " + lastName}
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="div">
            {email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {bio}
          </Typography>
          <Link variant="caption" underline="hover" color="text.secondary">
            {website}
          </Link>
        </CardContent>
      </Card>
    </>
  );
};
