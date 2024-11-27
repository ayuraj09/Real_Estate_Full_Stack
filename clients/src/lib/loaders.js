// import { defer } from "react-router-dom"
import { defer } from "react-router-dom";
import apiRequest from "./apiRequest"

export const singlePageLoader = async ({request,params}) => {
    const res = await apiRequest("/post/" + params.id)
    return res.data
}

export const listPageLoader = async ({ request, params }) => {
    const query = request.url.split("?")[1];
    const postPromise = apiRequest("/post?" + query);
    return defer({
      postResponse: postPromise,
    });
  };
  
export const profilePageLoader = async ({ request, params }) => {
    const postPromise = apiRequest("/users/profilepost/");
    const chatPromise = apiRequest.get("/chats");
    return defer({
      postResponse: postPromise,
      chatResponse: chatPromise,
    });
  };
  