/**
 * The idea of this duck is to contain all the things to do with the user activities
 * on github. So the viewLater, searchResults and actual searching all goes in here
 */

export { default as userActivityActions } from "./userActivity.actions";

export { default as userActivityReducer } from "./userActivity.reducer";

export * from "./userActivity.hook";
