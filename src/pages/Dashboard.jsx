import { AppBar, Toolbar, Typography } from "@mui/material";
import PageLayout from "../components/PageLayout";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const Dashboard = () => {
  return (
    <PageLayout>
      <Typography>Dashboard</Typography>
    </PageLayout>
  );
};

export default Dashboard;
