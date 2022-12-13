import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import MenuItem from "./components/MenuItem";
import ParentsMenu from "./components/ParentsMenu";
import { PERMISSIONS, APP_INFO } from "../../Constant";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    overflowX: "hidden",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  topMenu: {
    backgroundColor: "#07518c",
    margin: "-8px 0 0 0",
    padding: "10px",
    fontSize: "1.2rem",
    lineHeight: "2rem",
    color: theme.palette.secondary.contrastText,
    textAlign: "center",
    height: "48px",
  },
}));

export default function ASideMenuList() {
  const classes = useStyles();

  return (
    <List
      dense
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <div className={classes.topMenu}>{APP_INFO.name}</div>
{/* 
      <MenuItem iconName="home" text="Home" path="/home"></MenuItem>

      <MenuItem iconName="quiz" text="Test" path="/test"></MenuItem>

      <MenuItem
        iconName="face_retouching_natural"
        text="จัดการพนักงาน"
        path="/employeeManage"
        permissions={[PERMISSIONS.employee_read]}
      ></MenuItem>

      <ParentsMenu iconName="admin_panel_settings" text="Admin">
        <MenuItem iconName="star" text="Title" path="/title"></MenuItem>
      </ParentsMenu>

      <ParentsMenu
        iconName="admin_panel_settings"
        text="Test Permission"
        permissions={[PERMISSIONS.employee_delete]}
      >
        <MenuItem
          iconName="star"
          text="Title"
          path="/permissionTest"
          permissions={[PERMISSIONS.employee_delete]}
        ></MenuItem>
      </ParentsMenu> */}

    </List>
  );
}
