import { Stack, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Stack sx={{bgcolor:'teal'}} height={'150px'} justifyContent={"center"} alignItems={"center"}>
      <Typography fontSize={"2rem"} sx={{color:'white'}} fontWeight={"bolder"}>
        Footer
      </Typography>
    </Stack>
  );
}
