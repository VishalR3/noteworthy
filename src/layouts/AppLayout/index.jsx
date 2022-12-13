import { Grid, styled } from "@mui/material";
import { useState } from "react";
import Header from "./Header/Header";
import Sidebar from "./Sidebar";

const PositionedBody = styled("div")(({ theme }) => ({
  position: "absolute",
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
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
  const [sidebarWidth, setSidebarWidth] = useState(1.5);
  return (
    <>
      <PositionedBody>
        <Grid container spacing={3}>
          <Grid item xs={12} md={sidebarWidth}>
            <Sidebar />
          </Grid>
          <Grid
            item
            xs={12}
            md={12 - sidebarWidth}
            sx={{ position: "relative" }}
          >
            <Header />
            <ScrollableBody>{children}</ScrollableBody>
          </Grid>
        </Grid>
      </PositionedBody>
    </>
  );
}
