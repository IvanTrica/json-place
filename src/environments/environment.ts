// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const posts = 'posts';
const post = 'posts/';
const deletePosts = 'posts/';
const users = 'users';

export const apiUrl = 'https://jsonplaceholder.typicode.com/';

export const environment = {
  production: false
};

export const apiCall = {
  getPosts: apiUrl + posts,
  getUsers: apiUrl + users,
  deletePosts: apiUrl + deletePosts,
  getPost: apiUrl + post
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
