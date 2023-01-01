import { ExerciceBlock } from './ExerciceBlock';
import { Difficulty } from './Difficulty';
import { Exercise_Types } from './Exercice_type';
export interface Exercice {
  ex_id?: number;
  exercice_id: string;
  courseSeriesId: string;
  name: string;
  difficulty: Difficulty;
  order: string;
  type: Exercise_Types;
  question: string;
  exerciceorder: string;
  blocks: ExerciceBlock[];
  exerciceFile: any;
  rtl: boolean;
}

export enum AnswerFeedback {
  CORRECT = 'correct',
  WRONG = 'wrong'
}
