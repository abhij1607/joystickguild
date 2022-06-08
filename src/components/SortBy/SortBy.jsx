import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Typography, Stack } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

export const FeedSortBy = ({ setSortBy, sortBy }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (event) => {
    setSortBy(event.target.value);
    handleClose();
  };

  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h5">Feed</Typography>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <FilterListIcon />
        </Button>
      </Stack>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={sortBy}
            onChange={handleChange}
          >
            <MenuItem>
              <FormControlLabel
                value="LATEST"
                control={<Radio />}
                label="LATEST"
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                value="OLDEST"
                control={<Radio />}
                label="OLDEST"
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                value="TRENDING"
                control={<Radio />}
                label="TRENDING"
              />
            </MenuItem>
          </RadioGroup>
        </FormControl>
      </Menu>
    </div>
  );
};
