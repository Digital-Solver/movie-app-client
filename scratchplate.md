# Excercsise 3.8
Finalise React App

## Remaining Tasks

Summary: Refactor whole front end to use only redux for state management

- All required data objects are defined on store with appropriate actions and reducers (list of movies, currently logged-in user, filter for movies list)
- All required components are connected to Redux and their data is taken from store

## Rubric
- DONE: GH Repo contains the additional actions.js and reducers.js files in the appropriate place in the folder structure

- DONE Filtering movies is functioning as intended

## Tasks
1. Refactor all persistent data to be handled by the redux store. All views should be using Redux for state management.
2. Add an action and dispatcher for setting/modifying user data in the store. Then use/connect() this in appropriate places (LoginView, ProfileView, etc.)

### Tasks Further Breakdown:
- DONE: Install Redux
- Write the actions
- Define the application state
- Write the reducers
- Create the store with the reducers and wrap up the app with it
- Modify components so they read from the store (use mapStateToProps)
- Modify components so they write to the store through action dispatchers (use mapDispatchToProps)
- use connect() to link the component and these two map functions.
- Create a visibility filter input component to modify tha application visibilty filter
- Make sure propTypes specs are set and correct in every component (including the props set through the two map functions)
- Review the entre front end of the app including styling and necessary features
- Update the readme to make it accurate
- Test the final app in the browser
- Submit
- Final project portfolio: at the end of the program you are going to submit a final project portfolio with all your projects, start thinking about this now so that you are able to submit this final project portfolio on time for the end of the course.
