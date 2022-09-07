// package: proto
// file: error_response.proto

import * as jspb from "google-protobuf";

export class Error extends jspb.Message {
  getCode(): ErrorCodeMap[keyof ErrorCodeMap];
  setCode(value: ErrorCodeMap[keyof ErrorCodeMap]): void;

  getReason(): string;
  setReason(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Error.AsObject;
  static toObject(includeInstance: boolean, msg: Error): Error.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Error, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Error;
  static deserializeBinaryFromReader(message: Error, reader: jspb.BinaryReader): Error;
}

export namespace Error {
  export type AsObject = {
    code: ErrorCodeMap[keyof ErrorCodeMap],
    reason: string,
  }
}

export class ErrorResponse extends jspb.Message {
  clearErrorsList(): void;
  getErrorsList(): Array<Error>;
  setErrorsList(value: Array<Error>): void;
  addErrors(value?: Error, index?: number): Error;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ErrorResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ErrorResponse): ErrorResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ErrorResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ErrorResponse;
  static deserializeBinaryFromReader(message: ErrorResponse, reader: jspb.BinaryReader): ErrorResponse;
}

export namespace ErrorResponse {
  export type AsObject = {
    errorsList: Array<Error.AsObject>,
  }
}

export interface ErrorCodeMap {
  UNKNOWN: 0;
  INTERNAL: 1;
}

export const ErrorCode: ErrorCodeMap;

