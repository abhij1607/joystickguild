import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { EditProfileModal } from "components/Profile/EditProfileModal";
export const ProfileHeader = () => {
  return (
    <>
      <Card style={{ boxShadow: "none" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="160"
            image="https://picsum.photos/seed/picsum/556/140"
            alt="green iguana"
          />
          <CardContent>
            <Box
              sx={{
                display: "inline-flex",
                position: "absolute",
                top: "85px",
                justifyContent: "space-between",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="https://picsum.photos/800"
                sx={{ width: 152, height: 152 }}
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row-reverse" }} mb={4}>
              <EditProfileModal />
            </Box>

            <Typography variant="h5" component="div">
              Name
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              email@gmail.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
