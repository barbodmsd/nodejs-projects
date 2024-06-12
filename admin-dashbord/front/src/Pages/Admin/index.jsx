import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Stack, TextField } from "@mui/material";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import useFormField from "../../Utils/useformField";

export const GetResult = ({ img, name, id, price }) => {
  return (
    <Card sx={{ width: 350, height: 400 }}>
      <CardMedia sx={{ height: 240 }} image={img} title={name} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {name.slice(0, 20)}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Price : {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/product-details/${id}/${name.replaceAll(" ", "-")}`}>
          <Button>Details</Button>
        </Link>
      </CardActions>
    </Card>
  );
};
export default function Admin() {
  const [method, setMethod] = useState("GET");
  const [id, setId] = useState("");
  const [getResult, setGetResult] = useState();
  const [field, handleChange] = useFormField();
  let handleSubmit;
  if (method === "GET" || 'DELETE') {
    handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`,{method});
        const data = await res.json();
        setGetResult(data);
        toast.info(data.message);
      } catch (error) {
        console.log(error);
      }
    };
  }
  if (method === "PATCH") {
    handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`, {
          method,
          headers: { "content-type": "application/json" },
          body: JSON.stringify(field),
        });
        const data = await res.json();
        toast.info(data.message);
      } catch (error) {
        console.log(error);
      }
    };
  }
  if (method === "POST") {
    handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(`http://localhost:3000/products`, {
          method,
          headers: { "content-type": "application/json" },
          body: JSON.stringify(field),
        });
        const data = await res.json();
        toast.info(data.message);
      } catch (error) {
        console.log(error);
      }
    };
  }
  return (
    <>
      <Stack p={"50px"} gap={"50px"}>
        {/* select */}
        <Box sx={{ width: 200 }}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Method</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={method}
              label='Method'
              onChange={(e) => setMethod(e.target.value)}>
              <MenuItem value={"GET"}>GET</MenuItem>
              <MenuItem value={"PATCH"}>PATCH</MenuItem>
              <MenuItem value={"POST"}>POST</MenuItem>
              <MenuItem value={"DELETE"}>DELETE</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {method === "GET" && (
          <>
            {/* get */}
            <Stack
              onSubmit={handleSubmit}
              gap={"30px"}
              height={"100vh"}
              alignItems={"center"}>
              {/* inputs */}
              <Stack
                component={"form"}
                noValidate
                direction={"row"}
                gap={"20px"}
                justifyContent={"center"}>
                <TextField value={method} disabled />
                <Box width={"400px"}>
                  <TextField
                    onChange={(e) => setId(e.target.value)}
                    label={"ID"}
                    fullWidth
                  />
                </Box>
                <Button type={"submit"} variant={"contained"}>
                  send
                </Button>
              </Stack>
              {/* result */}
              {getResult && getResult.message === "get success" && (
                <GetResult
                  img={getResult.data[0]?.image}
                  name={getResult.data[0]?.title}
                  id={getResult.data[0]?.id}
                  price={getResult.data[0]?.price}
                />
              )}
            </Stack>
          </>
        )}
        {method === "PATCH" && (
          <>
            {/* get */}
            <Stack
              onSubmit={handleSubmit}
              gap={"30px"}
              minHeight={"100vh"}
              alignItems={"center"}>
              {/* inputs */}
              <Stack
                component={"form"}
                noValidate
                direction={"row"}
                gap={"20px"}
                justifyContent={"center"}>
                <TextField value={method} disabled />
                <Box width={"400px"}>
                  <TextField
                    onChange={(e) => setId(e.target.value)}
                    label={"ID"}
                    fullWidth
                  />
                </Box>
                <Button disabled={!field} type={"submit"} variant={"contained"}>
                  send
                </Button>
              </Stack>
              <Stack gap={"20px"}>
                <TextField
                  onChange={handleChange}
                  required
                  name={"title"}
                  label={"Title"}
                />
                <TextField
                  onChange={handleChange}
                  required
                  name={"price"}
                  label={"Price"}
                />

              </Stack>
            </Stack>
          </>
        )}
         {method === "POST" && (
          <>
            {/* get */}
            <Stack
              onSubmit={handleSubmit}
              gap={"30px"}
              minHeight={"100vh"}
              alignItems={"center"}>
              {/* inputs */}
              <Stack
                component={"form"}
                noValidate
                direction={"row"}
                gap={"20px"}
                justifyContent={"center"}>
                <TextField value={method} disabled />
                <Box width={"400px"}>
                  <TextField
                    label={"ID"}
                    disabled
                    fullWidth
                  />
                </Box>
                <Button disabled={!field} type={"submit"} variant={"contained"}>
                  send
                </Button>
              </Stack>
              <Stack gap={"20px"}>
                <TextField
                  onChange={handleChange}
                  required
                  name={"title"}
                  label={"Title"}
                />
                <TextField
                  onChange={handleChange}
                  required
                  name={"price"}
                  label={"Price"}
                />

              </Stack>
            </Stack>
          </>
        )}
        {method === "DELETE" && (
          <>
            {/* get */}
            <Stack
              onSubmit={handleSubmit}
              gap={"30px"}
              height={"100vh"}
              alignItems={"center"}>
              {/* inputs */}
              <Stack
                component={"form"}
                noValidate
                direction={"row"}
                gap={"20px"}
                justifyContent={"center"}>
                <TextField value={method} disabled />
                <Box width={"400px"}>
                  <TextField
                    onChange={(e) => setId(e.target.value)}
                    label={"ID"}
                    fullWidth
                  />
                </Box>
                <Button type={"submit"} variant={"contained"}>
                  send
                </Button>
              </Stack>
             
            </Stack>
          </>
        )}
      </Stack>
    </>
  );
}
