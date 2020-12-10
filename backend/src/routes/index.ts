import express from "express";
import axios from "axios";

const router = express.Router();

import { getStudentsData } from "../utils";

router.post("/", async (req: express.Request, res: express.Response) => {
  const videoUrl = req.body.videoUrl;
  const studentsData = await getStudentsData();
  const jsonToSend = {
    data: studentsData,
    videoUrl,
  };
  try {
    console.log("sending data to python - ", jsonToSend);
    const receivedData = await axios.post(
      "http://localhost:6000/",
      jsonToSend,
      {
        timeout: 10000000,
      }
    );
    console.log("received something on node - ", receivedData.data);
    return res.send(receivedData.data);
  } catch (error) {
    return res.send({ error: `error received on node - ${error}` });
  }
});

export default router;
