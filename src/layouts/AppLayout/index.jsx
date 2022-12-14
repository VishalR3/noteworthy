import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Drawer, Grid, IconButton, styled } from "@mui/material";
import { useState } from "react";
import Header from "./Header/Header";
import Sidebar from "./Sidebar";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: "100vh",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth}px`,
    }),
  })
);
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const PositionedBody = styled("div")(({ theme }) => ({
  position: "absolute",
  height: "100vh",
  width: "100vw",
  overflow: "hidden",

  "& ::-webkit-scrollbar": {
    width: "20px",
  },
  "& ::-webkit-scrollbar-track": {
    backgroundColor: `transparent`,
  },
  "& ::-webkit-scrollbar-thumb": {
    backgroundColor: `transparent`,
    borderRadius: `20px`,
    border: `6px solid transparent`,
    backgroundClip: `content-box`,
  },
  "& ::-webkit-scrollbar-thumb:hover": {
    backgroundColor: `#a8bbbf`,
  },
}));
const ScrollableBody = styled("div")(({ theme }) => ({
  height: "100%",
  width: "100%",
  overflowY: "scroll",
  position: "absolute",
  top: 0,
  left: 0,
  padding: theme.spacing(2),
  paddingTop: theme.spacing(5),
}));

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
      <PositionedBody>
        <Drawer
          sx={{
            position: "relative",
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={sidebarOpen}
        >
          <Sidebar />
        </Drawer>
        <Main open={sidebarOpen} sx={{ position: "relative" }}>
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <ScrollableBody>{children}</ScrollableBody>
        </Main>
      </PositionedBody>
    </>
  );
}
