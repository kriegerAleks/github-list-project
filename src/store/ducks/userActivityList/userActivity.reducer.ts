import produce from "immer";

import { userActivityActionTypes } from "./userActivity.actions";
import { gitHubUserEventTypes } from "../../../types";

export interface userActivity {
  isLoading: boolean;
  loaded: boolean;
  error: any;
  activityList: Array<gitHubUserEventTypes>;
  viewLater: Array<gitHubUserEventTypes>;
}

const initialState: userActivity = {
  isLoading: false,
  loaded: false,
  activityList: [],
  error: undefined,
  viewLater: [],
};

const reducer = produce((draftState: userActivity, action) => {
  switch (action.type) {
    case userActivityActionTypes.ADD_ITEM_TO_VIEW_LATER: {
      const { item } = action;
      const viewLater = [...draftState.viewLater, item];

      draftState.viewLater = viewLater;

      break;
    }

    case userActivityActionTypes.REMOVE_ITEM_FROM_VIEW_LATER: {
      const { itemId } = action;

      const newViewLater = draftState.viewLater.filter(
        (item) => item.id !== itemId
      );

      draftState.viewLater = newViewLater;

      break;
    }

    case userActivityActionTypes.SEARCH_FAIL: {
      const { error } = action;

      draftState.error = error;
      draftState.isLoading = false;
      draftState.loaded = true;

      break;
    }

    case userActivityActionTypes.SEARCH_RESOLVE: {
      const { itemList } = action;

      draftState.isLoading = false;
      draftState.loaded = true;
      draftState.activityList = itemList;

      break;
    }

    case userActivityActionTypes.SEARCH_STARTED: {
      draftState.isLoading = false;
      draftState.loaded = false;
      draftState.error = undefined;

      break;
    }
  }
}, initialState);

export default reducer;
