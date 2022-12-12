import { Avatar, Box, styled, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Link from "../../../Link";
import ViewNotes from "../../../ViewNotes/ViewNotes";

const SidebarWrapper = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  height: "100vh",
  width: "100%",
  position: "relative",
  padding: theme.spacing(2),
  "& .sidebar__logo": {
    "& h3": {
      color: theme.palette.primary.contrastText,
      textDecoration: "none",
      margin: 0,
      padding: 0,
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
}));

const AddNoteBtn = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  color: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  position: "absolute",
  bottom: theme.spacing(2),
  left: theme.spacing(2),
  width: "calc(100% - 32px)",
  "&:hover": {
    cursor: "pointer",
  },
}));

const Sidebar = () => {
  const { pathname } = useRouter();

  return (
    <SidebarWrapper>
      <div className="sidebar__logo">
        <Link href="/">
          <h3>NoteWorthy</h3>
        </Link>
      </div>
      <Box mt={3}>
        <ViewNotes />
      </Box>
      <AddNoteBtn>
        <Link href="/add">
          <Typography variant="body1">Add Note</Typography>
        </Link>
      </AddNoteBtn>
    </SidebarWrapper>
  );
};

export default Sidebar;
