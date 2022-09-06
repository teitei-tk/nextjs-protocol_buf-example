// package: proto
// file: users_read_response.proto

import * as jspb from "google-protobuf";
import * as user_pb from "./user_pb";

export class UsersReadResponse extends jspb.Message {
  clearUsersList(): void;
  getUsersList(): Array<user_pb.User>;
  setUsersList(value: Array<user_pb.User>): void;
  addUsers(value?: user_pb.User, index?: number): user_pb.User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UsersReadResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UsersReadResponse): UsersReadResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UsersReadResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UsersReadResponse;
  static deserializeBinaryFromReader(message: UsersReadResponse, reader: jspb.BinaryReader): UsersReadResponse;
}

export namespace UsersReadResponse {
  export type AsObject = {
    usersList: Array<user_pb.User.AsObject>,
  }
}

