import { Box, Container, Divider } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Container maxWidth='lg'>
      <Box sx={{ my: 10 }} />
      <Outlet />
      <Divider />
      <Box sx={{ my: 10 }} />
    </Container>
  );
}

export default Layout;
