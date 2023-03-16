import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Login Method
export const postLogin = (data) => api.create(url.POST_LOGIN, data);
export const postRegister = (data) => api.create(url.POST_REGISTER, data);

export const getPost = () => api.get(url.POST_URL);
export const getUserPost = () => api.get(url.POST_URL+'?isMy=true');
export const getPostTypeFilter = (data) => api.get(url.POST_URL+'?type='+data);
export const postPost = (data) => api.create(url.POST_URL, data);
export const postLike = (data) => api.update(url.POST_URL + "like/" + data);
export const postDelete = (data) => api.delete(url.POST_URL + data);
export const postEdit = (id, data) => api.update(url.POST_URL + id, data);

export const postComment = (id, data) => api.create(url.POST_COMMENT+id, data);
export const getComments = (data) => api.get(url.POST_COMMENT+data);
export const commentDelete = (data) => api.delete(url.POST_COMMENT+data);
export const likeComment = (data) => api.update(url.LIKE_COMMENT+data);