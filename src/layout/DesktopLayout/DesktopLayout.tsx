import React from "react";
import propTypes, { InferProps } from "prop-types";

import styled from "styled-components";

const Content = styled.div`
  grid-area: content;
  overflow-y: auto;
`;

const Main = styled.main`
  display: grid;

  background-color: #999999;

  grid-template-rows: auto auto;
  grid-template-areas: "header" "content";
  grid-gap: ${(props) => props.theme.spacing(1)}px;
`;

const Header = styled.header`
  grid-area: header;
  background-color: whitesmoke;
  padding: ${(props) => props.theme.spacing(2)}px;
`;

type LayoutProps = {
  header: React.ReactElement;
  children: Array<React.ReactNode> | React.ReactNode;
};

function DesktopLayout({ header, children }: LayoutProps) {
  return (
    <Main>
      <Header>{header}</Header>
      <Content>{children}</Content>
    </Main>
  );
}

DesktopLayout.propTypes = {
  header: propTypes.element,
};

export { DesktopLayout };
