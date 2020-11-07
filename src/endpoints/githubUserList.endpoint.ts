import { apiRoot } from "./../consts";
import axios from "axios";

// reference: https://docs.github.com/en/free-pro-team@latest/rest/reference/activity#list-public-events-for-a-user
function getUserEvents(username: string) {
  return axios.get(`${apiRoot}/users/${username}/events/public`);
}

export default {
  getUserEvents,
};
