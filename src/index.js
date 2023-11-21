import connectDB from "./db/index.js";
import dontenv from "dotenv";
import { app } from "./app.js";

dontenv.config({ path: "./env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on PORT::${process.env.PORT}`);
    });
    app.on("error", (err) => {
      console.log("ERR", err);
      throw err;
    });
  })
  .catch((err) => {
    console.log(`Mongo DB connection failed ${err?.message}`);
    process.exit(1);
  });

// const app = express();
// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on("error", (err) => {
//       console.log("ERR", err);
//       throw err;
//     });

//     app.listen(proces.env.PORT, () => {
//       console.log(`App listening on PORT ${proces.env.PORT}`);
//     });
//   } catch (err) {
//     console.log("ERR", err);
//     throw err;
//   }
// })();
