// because a stringUrl is directly asigned to a string this is relatively safe,
// but this allows me to more easily see what this is and how to treat it with
// less context about it.

export type isoDateString = string;
export type stringUrl = string;

type githubUserEventTypes = "CreateEvent" | "PushEvent" | "PullRequestEvent";

interface githubUserEventOrganisation {
  id: number;
  login: string;
  gravitar_id: string;
  url: stringUrl;
  avatar_url: stringUrl;
}

export interface githubUserEventPublic {
  id: string;
  type: githubUserEventTypes;
  actor: githubEventsActor;
  repo: githubEventsRepo;
  public: boolean;
  created_at: isoDateString;
  org?: githubUserEventOrganisation;
}

export interface githubEventUser {
  login: string;
  id: string;
  node_id: string;
  avatar_url: stringUrl;
  gravatar_id: string;
  url: stringUrl;
  html_url: stringUrl;
  followers_url: stringUrl;
  following_url: stringUrl;
  gists_url: stringUrl;
  starred_url: stringUrl;
  subscriptions_url: stringUrl;
  organizations_url: stringUrl;
  repos_url: stringUrl;
  events_url: stringUrl;
  received_events_url: stringUrl;
  type: "User" | string; // it is assumed that there are others
  site_admin: boolean;
}

export interface githubEventsActor {
  id: number;
  login: string;
  display_login: string;
  gravatar_id: string;
  url: stringUrl;
  avatar_url: stringUrl;
}

export interface githubEventsRepo {
  id: string;
  name: string;
  url: stringUrl;
}

export interface githubEventCommit {
  sha: string;
  author: {
    email: string;
    name: string;
  };
  message: string;
  distinct: boolean;
  url: stringUrl;
}

export interface githubUserPushEventPublic extends githubUserEventPublic {
  type: "PushEvent";
  payload: {
    push_id: string;
    size: 1;
    distinct_size: 1;
    ref: string;
    head: string;
    before: string;
    commits: Array<githubEventCommit>;
  };
}

export interface githubUserCreateEventPublic extends githubUserEventPublic {
  type: "CreateEvent";
  payload: {
    ref: string;
    ref_type: string;
    master_branch: string;
    description: string;
    pusher_type: string;
  };
}

// TODO:
export interface githubUserPullRequestEvent extends githubUserEventPublic {}

export type gitHubUserEventTypes =
  | githubUserCreateEventPublic
  | githubUserPushEventPublic;
