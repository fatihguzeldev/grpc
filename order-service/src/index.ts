import * as grpc from "@grpc/grpc-js";
import { UserDirectoryClient } from "./grpc/user";

const client = new UserDirectoryClient(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.getUserById(
  { userId: "2" },
  (err, response) => {
    if (err) {
      console.error("grpc error:", err.message);
      return;
    }

    console.log("user from user-service:", response);
  }
);