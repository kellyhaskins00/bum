import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Navigation from "../../Layout/Layout";
// import Scheduling from "../../Admin/Scheduling/Scheduling";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  toolbar: theme.mixins.toolbar,
  link: {
    textDecoration: "none",
    color: "black"
  }
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Navigation />
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button>
            <ListItemText>
              <a
                className={classes.link}
                href="/admin/education"
                to="/admin/education"
              >
                Education Personalization
              </a>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
              <a className={classes.link} href="/admin/physicianInfo">
                Physician Info
              </a>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
              <a
                className={classes.link}
                href="/admin/scheduling"
                to="/admin/scheduling"
              >
                Scheduling
              </a>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
              <a className={classes.link} href="/admin/all-patients">
                Patients
              </a>
            </ListItemText>
          </ListItem>
          <ListItem button onClick={handleClick}>
            <ListItemText>New Patient Entry</ListItemText>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button>
                <ListItemText>
                  <a className={classes.link} href="/admin/forms/addPatients">
                    Add Patients
                  </a>
                </ListItemText>
              </ListItem>
            </List>
          </Collapse>
        </List>

        <Divider />
      </Drawer>
    </div>
  );
}