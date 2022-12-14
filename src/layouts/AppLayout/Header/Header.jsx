import { ThemeContext } from "@emotion/react";
import { ChevronLeft, ChevronRight, Menu } from "@mui/icons-material";
import { IconButton, styled } from "@mui/material";

const StyledHeader = styled("header")(({ theme }) => ({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  zIndex: 10,
  padding: theme.spacing(1),
  backdropFilter: "blur(16px)",
}));

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <StyledHeader>
      <IconButton
        sx={{ cursor: "pointer" }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <ChevronLeft /> : <Menu />}
      </IconButton>
    </StyledHeader>
  );
};
export default Header;
