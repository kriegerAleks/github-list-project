import { userActivity } from "./userActivity.reducer";
import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

import userActions from "./userActivity.actions";

export const useUserActivity = () => {
  const dispatch = useDispatch();

  const userActivityStore: userActivity = <userActivity>(
    useSelector<any>((state) => state.userActivity)
  );

  const search = (userName: string) => {
    dispatch(userActions.searchForPublicUserActivity({ userName }));
  };

  const toReturn: [userActivity, typeof search] = [userActivityStore, search];
  return toReturn;
};
