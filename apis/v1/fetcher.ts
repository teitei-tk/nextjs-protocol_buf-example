const protocolBuffersFetcher = (url: string, init?: RequestInit) => {
  return new Promise<ArrayBuffer>(async (resolve, reject) => {
    const result = await fetch(url, {
      headers: {
        "Content-Type": "application/protobuf",
      },
    });

    const data = await result.arrayBuffer();
    if (result.status !== 200) {
      return reject(data);
    }
    resolve(data);
  });
};

export { protocolBuffersFetcher };
