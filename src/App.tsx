import React from "react";
import * as Views from "./views";
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
              <h1>Hello i am a blank landing page</h1>
            </Route>
          </Switch>
        </Router>
      </ThemeWrapper>
    </ReduxProvider>
  );
};

export default App;
