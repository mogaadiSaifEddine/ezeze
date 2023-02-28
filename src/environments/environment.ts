// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// serverApi: 'http://179.61.246.84:8081/',

export const environment = {
  production: false,
  // serverApi: 'http://179.61.246.84:8081/',
  serverApi: 'http://localhost:8087/',
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
