import React, { useState, useEffect } from "react";
import { BehaviorSubject } from "rxjs";
import { debounceTime, distinct, filter } from "rxjs/operators";
import { useDispatch } from "react-redux";

import {
  Typography,
  TextField,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Avatar,
  FormControlLabel,
} from "@material-ui/core";

import { DesktopLayout } from "../../layout";
import { useUserActivity } from "../../store/ducks/userActivityList";
import actions from "../../store/actions";
import { githubUserEventPublic } from "../../types";

import {
  SectionToggleWrapper,
  SectionWrapper,
  Switch,
  ResultList,
} from "./UserActivity.view.styles";
import { GithubUserEventCard } from "../../components";

function UserActivityView() {
  const dispatch = useDispatch();
  const [useViewLater, setUseViewLater] = useState(false);

  const [textSub] = useState(new BehaviorSubject(""));

  const [
    { isLoading, loaded, activityList, viewLater },
    searchForUserActivity,
  ] = useUserActivity();

  useEffect(() => {
    const textSubscription = textSub
      .pipe(
        // filter((x) => !!x),
        debounceTime(70),
        distinct()
      )
      .subscribe((userName) => {
        searchForUserActivity(userName);
      });
    return () => textSubscription.unsubscribe();
  }, [textSub]);

  const currentList = useViewLater ? viewLater : activityList;

  const currentListIsPopulated = currentList.length > 0;

  const viewLaterToggleLabelPlacement = !useViewLater ? "end" : "start";
  const pageTitle = useViewLater ? "View Later" : "Search";

  const addToViewLater = (item: githubUserEventPublic) => {
    dispatch(actions.userActivity.addItemToViewLater({ item }));
  };
  const removeFromViewLater = (item: githubUserEventPublic) => {
    dispatch(actions.userActivity.removeItemFromViewLater({ itemId: item.id }));
  };

  const cardActionLabel = useViewLater
    ? "Remove from view later"
    : "Add to view later";
  const cardAction = useViewLater ? removeFromViewLater : addToViewLater;

  return (
    <DesktopLayout
      header={
        <SectionWrapper>
          <Typography component="h1" variant="h3">
            Github User {pageTitle}
          </Typography>
          <br />
          <TextField
            onChange={(e) => {
              textSub.next(e.target.value);
            }}
            label="Enter a user to search for"
          />
        </SectionWrapper>
      }
    >
      <SectionToggleWrapper>
        <Typography variant="h5">
          Toggle between saved and retrieved results
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={useViewLater}
              onChange={(e) => {
                setUseViewLater(e.target.checked);
              }}
            />
          }
          label={pageTitle}
          labelPlacement={viewLaterToggleLabelPlacement}
        />
      </SectionToggleWrapper>
      {currentListIsPopulated && (
        <ResultList>
          {currentList.map((activityItem) => {
            return (
              <GithubUserEventCard
                userEvent={activityItem}
                cardAction={cardAction}
                cardActionLabel={cardActionLabel}
                key={activityItem.id}
              />
            );
          })}
        </ResultList>
      )}
    </DesktopLayout>
  );
}

export default UserActivityView;
