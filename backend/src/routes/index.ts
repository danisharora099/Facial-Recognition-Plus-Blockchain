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
  console.log("sending data to python - ", jsonToSend);
  try {
    const receivedData = await axios.post("http://localhost:6000/", jsonToSend);
    return res.send({ receivedData });
  } catch (error) {
    return res.send({ error: `error from python, ${error} ` });
  }
});

export default router;
