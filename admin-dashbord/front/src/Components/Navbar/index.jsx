import React from "react";
import {Button, Stack} from '@mui/material'
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <Stack
      direction={"row"}
      height={60}
      gap={'12px'}
      px={'50px'}
      alignItems={"center"}
      sx={{
        bgcolor:'teal'
      }}
      >
        <Link to={'/'}><Button sx={{color:'white'}}>Products</Button></Link>
        <Link to={'/admin'}><Button sx={{color:'white'}}>Admin</Button></Link>
        <Link to={'/auth'}><Button sx={{color:'white'}}>Auth</Button></Link>
      </Stack>
  );
}
