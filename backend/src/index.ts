import "dotenv/config";
import express from "express";
import routes from "./routes";
import connectDb from "./connectDb";

const app = express();
const PORT = process.env.PORT || 4000;
const mongo = connectDb();

app.use(express.json());

app.use("/", routes);

mongo
  .then(() => {
    console.log("Connected to Mongo");
    app.listen(PORT, () => {
      console.log("Server started on port", PORT);
    });
  })
  .catch((error) => console.error("error: ", error));
