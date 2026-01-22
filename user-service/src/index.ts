import * as grpc from '@grpc/grpc-js';
import {
  UserDirectoryService,
  UserDirectoryServer,
  GetUserByIdRequest,
  CreateUserRequest,
  UserResponse
} from "./grpc/user"

// mock db
const users: { id: string; name: string; email: string }[] = [
  { id: "1", name: "alice", email: "alice@demo.com" },
  { id: "2", name: "bob", email: "bob@demo.com" },
];

// handler
const handlers: UserDirectoryServer = {
  getUserById: (call, callback) => {
    const userId = call.request.userId;
    const user = users.find(u => u.id === userId);

    if (!user) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "user not found",
      })
    }

    const res: UserResponse = {
      email: user.id,
      id: user.id,
      name: user.name
    }

    callback(null, res);
  },
  createUser: (call, callback) => {
    const { name, email } = call.request;
    const id =  (users.length + 1).toString();

    const newUser = {id, name, email};
    users.push(newUser);

    const res: UserResponse = {
      id,
      name,
      email
    }

    callback(null, res);
  }
};

// server setup
const server = new grpc.Server();
server.addService(UserDirectoryService, handlers);

const PORT = 50051;
server.bindAsync(
  `127.0.0.1:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`user-service running on port ${port}`);
  }
)