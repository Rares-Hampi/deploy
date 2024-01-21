import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "./routes/func";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(router);

app.use((req, res) => {
  console.log(req.url);
  res.status(404).send("Route doesn't exist");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
