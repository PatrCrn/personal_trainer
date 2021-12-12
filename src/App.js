import './App.css';
import Customerlist from "./components/Customerlist";
import React from "react"
import {Button, AppBar, Box, Toolbar, Typography} from "@material-ui/core";
import Traininglist from "./components/Traininglist";
import Calendar from "./components/Calendar";
import Statistics from "./components/Statistics";

const pages = ['Customers', 'Trainings', 'Calendar', "Statistics"];

function App() {
  const [anchorElNav, setAnchorElNav] = React.useState("Customers");

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(page);
  };

  const MyAppBar = () => {
    return (
        <AppBar position="sticky">
          <Toolbar disableGutters>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                style={{marginLeft: 10}}
            >
              EasyFit
            </Typography>

            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
              {pages.map((page) => (
                  <Button
                      key={page}
                      onClick={_=>handleCloseNavMenu(page)}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                      style={{color: 'white', marginLeft: 10}}
                  >
                    {page}
                  </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
    )
  }

  if (anchorElNav === "Customers") {
    return (
        <div className="App">
          <MyAppBar />
          <Customerlist />
        </div>
    )
  } else if (anchorElNav === "Trainings") {
    return (
        <div className="App">
          <MyAppBar />
          <Traininglist />
        </div>
    )
  } else if (anchorElNav === "Calendar") {
      return (
          <div className="App">
              <MyAppBar />
              <Calendar />
          </div>
      )
  }
  else if (anchorElNav === "Statistics") {
      return (
          <div className="App">
              <MyAppBar />
              <Statistics />
          </div>
      )
  }
}

export default App;