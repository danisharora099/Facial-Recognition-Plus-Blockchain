import "dotenv/config";
import express from "express";
import routes from "./routes";
import connectDb from "./connectDb";

// const timeout = require("express-timeout-handler");
// const timeoutOptions = {
//   timeout: 5 * 60 * 1000,
//   onTimeout: (req: express.Request, res: express.Response) => {
//     res.status(503).send("Took too long");
//   },
//   onDelayedResponse: (req, method, args, requestTime) => {
//     console.log(`Attempted to call ${method} after timeout`);
//   },
// };

const app = express();
const PORT = process.env.PORT || 4000;
const mongo = connectDb();

app.use(express.json());

app.use("/", routes);

mongo
  .then(() => {
    console.log("Connected to Mongo");
    const server = app.listen(PORT, () => {
      console.log("Server started on port", PORT);
    });
    server.setTimeout(400000);
  })
  .catch((error) => console.error("error: ", error));
