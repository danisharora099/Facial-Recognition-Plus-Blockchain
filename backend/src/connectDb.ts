import mongoose from "mongoose";

const password = process.env.MONGO_PASSWORD;

const connectionString = `mongodb+srv://ulpha:${password}@cluster0.ekcww.mongodb.net/facial_recog?retryWrites=true&w=majority`;

export default function connectDb(): Promise<mongoose.Mongoose> {
  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });
}
