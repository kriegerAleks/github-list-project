import React from "react";
import { UserActivityView } from "./views";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { ThemeWrapper } from "./theme";
import ReduxProvider from "./store/ReduxProvider";

const App = () => {
  return (
    <ReduxProvider>
      <ThemeWrapper>
        <Router>
          {/* The store provider will come in here if it proves neccessary (it probably will but who knows) */}
          <Switch>
            <Route path="/">
              <UserActivityView />
            </Route>
          </Switch>
        </Router>
      </ThemeWrapper>
    </ReduxProvider>
  );
};

export default App;
