import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import userRoute from "./Routes/userRoute.js";
import productRoute from "./Routes/productRoute.js";
const app = express();

// create variable to find root path
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
// cors for who can use this api
app.use(cors());
// for i can get the data into body in from request
app.use(express.json());

// Endpoints
app.use("/users", userRoute);
app.use('/products',productRoute)




// for return message if someone write wrong api address 
app.use('*',(req,res,next)=>{
    res.status(404).json({message:'api address is wrong'})
})

// start server
app.listen(3000, () => {
  console.log("server is run :)");
});
