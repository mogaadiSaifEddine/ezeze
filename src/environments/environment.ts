// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// serverApi: 'http://179.61.246.84:8081/',

export const environment = {
  production: false,

  // // Dev server Api
  serverApi: 'http://179.61.246.84:8081/',

  // local server Api
  // serverApi: 'http://localhost:8081/',

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  /******************** */
  /******************** */
  /******************** */
  /******************** */
  /******************** */
  /******************** */
  /******************** */
  /******************** */
  /******************** */
  /******************** */
  /******************** */
  /******************** */
  /******************** */
  /* ********************************************** DO NOT TOUCH THIS  : ONLY FOR PROD  ❗❗❗❗❗ **********/
  // Prod server Api
  //❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗ serverApi: 'http://197.13.31.221:8081/',❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗
  /* ********************************************** DO NOT TOUCH THIS ❗❗❗❗❗ **********/
  /******************** */
  /******************** */
  /******************** */
  /******************** */
  /******************** */
  /******************** */ /******************** */
  /******************** */
  /******************** */
  /******************** */
  /******************** */
  /******************** */
  chapterByTeacher: 'Chapter/',
  group: 'group/',
  matieres: 'Chapter/matieres/{userId}',
  block: 'block/',
  exercice: 'Excercise/',
  exerciceBlock: 'exerciceBlock/',
  serieExercice: 'serie_exercice/',
  userAnswer: 'UserAnswer/',
  getScoreSerie: 'UserAnswer/score/{userId}/{serie_exercice_id}',

  filesSrc: 'filegetter/{{fileurl}}'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
