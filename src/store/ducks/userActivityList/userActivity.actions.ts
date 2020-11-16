import { Dispatch } from "redux";
import { githubUserEventPublic } from "../../../types";
import { githubUserList } from "../../../endpoints";

export enum userActivityActionTypes {
  SEARCH_STARTED = "[userActivity]SEARCH_STARTED",
  SEARCH_RESOLVE = "[userActivity]SEARCH_RESOLVE",
  SEARCH_FAIL = "[userActivity]SEARCH_FAIL",
  ADD_ITEM_TO_VIEW_LATER = "[userActivity]ADD_ITEM_TO_VIEW_LATER",
  REMOVE_ITEM_FROM_VIEW_LATER = "[userActivity]REMOVE_ITEM_FROM_VIEW_LATER",
}

const searchStarted = ({ userName }: { userName: string }) => ({
  type: userActivityActionTypes.SEARCH_STARTED,
  userName,
});

const searchResolved = ({
  itemList,
}: {
  itemList: Array<githubUserEventPublic>;
}) => ({
  type: userActivityActionTypes.SEARCH_RESOLVE,
  itemList,
});

const searchFail = ({ error }: { error: any }) => ({
  type: userActivityActionTypes.SEARCH_FAIL,
  error,
});

const addItemToViewLater = ({ item }: { item: githubUserEventPublic }) => ({
  type: userActivityActionTypes.ADD_ITEM_TO_VIEW_LATER,
  item,
});

const removeItemFromViewLater = ({ itemId }: { itemId: string }) => ({
  type: userActivityActionTypes.REMOVE_ITEM_FROM_VIEW_LATER,
  itemId,
});

function searchForPublicUserActivity({ userName }: { userName: string }) {
  return (dispatch: Dispatch) => {
    dispatch(searchStarted({ userName }));
    return githubUserList
      .getUserEvents(userName)
      .then((result) => {
        return dispatch(searchResolved({ itemList: result.data }));
      })
      .catch((error) => {
        dispatch(searchFail({ error }));
      });
  };
}

export default {
  removeItemFromViewLater,
  addItemToViewLater,
  searchFail,
  searchResolved,
  searchStarted,
  searchForPublicUserActivity,
};
