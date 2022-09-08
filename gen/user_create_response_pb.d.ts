// package: proto
// file: user_create_response.proto

import * as jspb from "google-protobuf";
import * as user_pb from "./user_pb";

export class UserCreateResponse extends jspb.Message {
  hasUser(): boolean;
  clearUser(): void;
  getUser(): user_pb.User | undefined;
  setUser(value?: user_pb.User): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCreateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCreateResponse): UserCreateResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserCreateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCreateResponse;
  static deserializeBinaryFromReader(message: UserCreateResponse, reader: jspb.BinaryReader): UserCreateResponse;
}

export namespace UserCreateResponse {
  export type AsObject = {
    user?: user_pb.User.AsObject,
  }
}

