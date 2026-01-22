# grpc
a minimal grpc demo that shows how service-to-service communication works using protobuf and code generation.

# stub codegen
```sh
npx grpc_tools_node_protoc \
  --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto \
  --ts_proto_out=./src/grpc \
  --ts_proto_opt=outputServices=grpc-js,esModuleInterop=true \
  -I ./contracts \
  ./contracts/user.proto
```
