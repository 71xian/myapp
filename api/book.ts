import request from "./request";

export function getList(url: string) {
  return request.get("/book", {
    params: {
      url: url,
    },
  });
}

export function getText(url: string) {
  return request.get("/read", {
    params: {
      url: url,
    },
  });
}
