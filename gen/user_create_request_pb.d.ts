// package: proto
// file: user_create_request.proto

import * as jspb from "google-protobuf";

export class UserRegisterRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserRegisterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserRegisterRequest): UserRegisterRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserRegisterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserRegisterRequest;
  static deserializeBinaryFromReader(message: UserRegisterRequest, reader: jspb.BinaryReader): UserRegisterRequest;
}

export namespace UserRegisterRequest {
  export type AsObject = {
    name: string,
    email: string,
  }
}

