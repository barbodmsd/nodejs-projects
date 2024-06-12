import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import useFormField from "../../../Utils/useformField";
import AuthContext from "../../../Utils/AuthContext";

export default function Login({ handlePageType }) {
  const { handleToken, token } = useContext(AuthContext);
  const [field, handleChange] = useFormField();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(field),
      });
      const data = await res.json();
      toast.success(data.message);
      handleToken(data.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack height={"100vh"} justifyContent={"center"} alignItems={"center"}>
        <Stack
          gap={"20px"}
          component={"form"}
          noValidate
          onSubmit={handleSubmit}>
          <Typography fontSize={"1.2rem"}>Login</Typography>
          <TextField
            name={"username"}
            type={"username"}
            required
            label={"Username"}
            onChange={handleChange}
          />
          <TextField
            name={"password"}
            type={"password"}
            required
            label={"Password"}
            onChange={handleChange}
          />
          <Button disabled={!field} variant={"contained"} type={"submit"}>
            Submit
          </Button>
        </Stack>
        <Button onClick={handlePageType}>Don't have account?</Button>
      </Stack>
    </>
  );
}
