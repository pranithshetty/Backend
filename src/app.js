import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

//middlewares
// cors aloowed
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//accept json with size limit of 16kb
app.use(
  express.json({
    limit: "16kb",
  })
);

//parse data from url
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//for storing some assets ex:favicon
app.use(express.static("public"));

//cookieparser
app.use(cookieParser());

const app = express();

export { app };
