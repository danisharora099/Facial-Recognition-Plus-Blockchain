import express from "express";
import College from "../../Ethereum/college";
import { IStudent } from "../types/Student";

const router = express.Router();

router.get(
  "/students",
  async (_req: express.Request, res: express.Response) => {
    const totalStudents = await College.methods.studentCount().call();
    let students: IStudent[] = [];

    for (let i = 1; i <= totalStudents; i++) {
      const studentBlockchain = await College.methods.students(i).call();
      const {
        id: index,
        nameHash: name,
        imageHash: imageUrl,
        rollnoHash: rollNo,
        classHash: classSec,
      } = studentBlockchain;
      const student = {
        index: parseInt(index),
        name,
        imageUrl,
        rollNo: parseInt(rollNo),
        classSec,
      } as IStudent;
      students.push(student);
    }
    return res.send({ students });
  }
);

export default router;
