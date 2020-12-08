import mongoose from "mongoose";

export interface IStudent {
  index: number;
  name: string;
  imageUrl: string;
  rollNo: number;
  classSec: string;
}

export interface IExtendedStudent extends mongoose.Document, IStudent {}

export const studentSchema = new mongoose.Schema({
  index: Number,
  name: String,
  imageUrl: String,
  rollNo: Number,
  classSec: String,
});

const Student = mongoose.model<IExtendedStudent>("studentModel", studentSchema);

export default Student;
