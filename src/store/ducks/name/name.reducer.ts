import produce from "immer";

import { NameTypes } from "./name.types";

interface NameReducerShape {
  name: string;
}

const initialState: NameReducerShape = {
  name: "",
};

const reducer = produce((draftState: NameReducerShape, action) => {
  switch (action.type) {
    case NameTypes.ADD_NAME: {
      const { name } = action.name;
      draftState = name;
      break;
    }
    case NameTypes.REMOVE_NAME: {
      draftState.name = "";
      break;
    }
    default: {
    }
  }
}, initialState);

export default reducer;
