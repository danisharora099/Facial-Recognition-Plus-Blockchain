import { s3Config } from "./config";
import S3 from "aws-s3";

export default class S3Client {
  constructor() {
    this.s3 = new S3(s3Config);
  }
  uploadFile = async (file, filename) => {
    try {
      const url = await this.s3.uploadFile(file, filename);
      return url;
    } catch (error) {
      console.error(error);
    }
  };
}
