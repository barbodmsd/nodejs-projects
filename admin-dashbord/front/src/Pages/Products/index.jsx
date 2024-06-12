import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";

export const ProductCard = ({ img, price, id, name }) => {
  return (
    <Card sx={{ width: 300, height: 400 }} elevation={5}>
      <CardMedia sx={{ height: 200 }} image={img} title={name} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {name.slice(0, 20)}
        </Typography>
        <Typography gutterBottom variant='h5' component='div'>
          Price : {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          to={`/product-details/${id}/${name
            .toLowerCase()
            .replaceAll(" ", "-")}`}>
          <Button variant={"contained"}>details</Button>
        </Link>
      </CardActions>
    </Card>
  );
};
export default function Products() {
  const [products, setProducts] = useState();
  //   get all products
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();
      setProducts(data);
    })();
  }, []);
  const items = products?.map((e, index) => (
    <ProductCard
      key={index}
      img={e.image}
      name={e.title}
      id={e.id}
      price={e.price}
    />
  ));
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        gap={"20px"}
        flexWrap={"wrap"}
        p={"50px"}>
        {items}
      </Stack>
    </>
  );
}



