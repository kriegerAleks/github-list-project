import React from "react";

import {
  Avatar,
  CardContent,
  Typography,
  Card,
  CardHeader,
  CardActions,
  Button,
} from "@material-ui/core";

import { gitHubUserEventTypes } from "../../types";

interface GithubUserEventCardProps {
  userEvent: gitHubUserEventTypes;
  cardAction: (item: gitHubUserEventTypes) => void;
  cardActionLabel: string;
}

function GithubUserEventCard({
  userEvent,
  cardAction,
  cardActionLabel,
}: GithubUserEventCardProps) {
  const {
    type,
    actor: { avatar_url, display_login },
    id,
    repo: { name, url },
  } = userEvent;

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<Avatar src={avatar_url} />}
        title={<Typography>User: {display_login}</Typography>}
        subheader={
          <Typography color="textSecondary" gutterBottom variant="subtitle2">
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
        <Button onClick={() => cardAction(userEvent)}>{cardActionLabel}</Button>
      </CardActions>
    </Card>
  );
}

export default GithubUserEventCard;
