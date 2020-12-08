import { s3Config } from "./config";
import S3 from "aws-s3";

export default class S3Client {
  constructor() {
    const s3 = new S3(config);
  }
  uploadFile = async (file, filename) => {
    try {
      const url = await s3.uploadFile(file, filename);
      return url;
    } catch (error) {
      console.error(error);
    }
  };
}
