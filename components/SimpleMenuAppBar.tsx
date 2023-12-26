import React from "react";
import { AppBar, Toolbar, Typography } from '@mui/material';

const SimpleMenuAppBar: React.FC = () => {
  return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Team Manager Application
          </Typography>
        </Toolbar>
      </AppBar>
    );
}

export default SimpleMenuAppBar;