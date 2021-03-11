import request from "@/fetch/index";

export const getLists = (params = {}) => {
  return request.get("/vue-admin-template/params/list", {
    params
  });
};
