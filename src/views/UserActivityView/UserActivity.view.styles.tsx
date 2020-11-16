import styled from "styled-components";
import { Switch as S, Paper } from "@material-ui/core";

export const Switch = styled(S)`
  margin: ${(props) => props.theme.spacing(1)}px;
`;

export const SectionWrapper = styled(Paper)`
  margin: ${(props) => props.theme.spacing(1)}px;
  padding: ${(props) => props.theme.spacing(1)}px;
`;

export const SectionToggleWrapper = styled(SectionWrapper)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const ResultList = styled(SectionWrapper)`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: ${(props) => props.theme.spacing(1)}px;
`;
