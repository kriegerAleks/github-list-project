import React, { useState, useEffect } from "react";
import { BehaviorSubject } from "rxjs";
import { debounceTime, distinct, filter } from "rxjs/operators";
import {
  Paper,
  Typography,
  TextField,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Avatar,
  FormControlLabel,
  Switch,
} from "@material-ui/core";

import { useDispatch } from "react-redux";

import styled from "styled-components";
import { DesktopLayout } from "../../layout";
import { useUserActivity } from "../../store/ducks/userActivityList";
import actions from "../../store/actions";
import { githubUserEventPublic } from "../../types";

const SectionWrapper = styled(Paper)`
  margin: ${(props) => props.theme.spacing(1)}px;
  padding: ${(props) => props.theme.spacing(1)}px;
`;

const ResultList = styled(SectionWrapper)`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: ${(props) => props.theme.spacing(1)}px;
`;

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
        debounceTime(70),
        distinct(),
        filter((x) => !!x)
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
      <SectionWrapper>
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
      </SectionWrapper>
      {currentListIsPopulated && (
        <ResultList>
          {activityList.map((activityItem) => {
            const {
              type,
              actor: { avatar_url, display_login },
              id,
              repo: { name, url },
            } = activityItem;
            return (
              <Card variant="outlined">
                <CardHeader
                  avatar={<Avatar src={avatar_url} />}
                  title={<Typography>User: {display_login}</Typography>}
                  subheader={
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="subtitle2"
                    >
                      Type:{type}
                    </Typography>
                  }
                />
                <CardContent>
                  <Typography>Event Id:{id}</Typography>
                  <Typography>Repo Name:{name}</Typography>
                  <Typography>Repo URL:{url}</Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => cardAction(activityItem)}>
                    {cardActionLabel}
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </ResultList>
      )}
    </DesktopLayout>
  );
}

export default UserActivityView;
