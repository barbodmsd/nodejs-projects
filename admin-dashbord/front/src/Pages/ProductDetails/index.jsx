import {
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const [product, setProduct] = useState();
  const { id } = useParams();
  //   get  product by id
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3000/products/${id}`);
      const data = await res.json();
      setProduct(data);
    })();
  }, []);
  console.log(product)
  return (
    <>
      <Stack justifyContent={"center"} alignItems={"center"} height={"100vh"}>
        {product ? (
          <Card sx={{ width: 500, height: 400 }} elevation={5}>
            <CardMedia
              sx={{ height: 250 }}
              image={product.data[0]?.image}
              title={product.data[0]?.title}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {product.data[0]?.title}
              </Typography>
              <Typography gutterBottom variant='h5' component='div'>
                Price : {product.data[0]?.price}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Card sx={{ width: 500, height: 400 }} elevation={5}>
            <Skeleton height={"250px"} width={"100%"} variant={"rectangular"} />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                <Skeleton height={"30px"} width={"50%"} />
              </Typography>
              <Typography gutterBottom variant='h5' component='div'>
                <Skeleton height={"30px"} width={"50px"} />
              </Typography>
            </CardContent>
          </Card>
        )}
      </Stack>
    </>
  );
}
