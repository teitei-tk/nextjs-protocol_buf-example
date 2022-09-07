import { ErrorResponse } from "gen/error_response_pb";

const protocolBuffersFetcher = (url: string, init?: RequestInit) => {
  return new Promise<ArrayBuffer>(async (resolve, reject) => {
    const result = await fetch(url, {
      headers: {
        "Content-Type": "application/protobuf",
      },
    });

    const data = await result.arrayBuffer();
    if (result.status === 200) {
      resolve(data);
    } else {
      const buf = new Uint8Array(data ?? []);
      const resp = ErrorResponse.deserializeBinary(buf);
      reject(resp);
    }
  });
};

export { protocolBuffersFetcher };
