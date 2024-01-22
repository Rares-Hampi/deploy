import express from "express";
import cors from "cors";

import router from "./routes/func";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(router);

app.use((req, res) => {
  console.log(req.url);
  res.status(404).send("Route doesn't exist");
});

app.use("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5500, "0.0.0.0", () => {
  console.log("Server is running");
});
