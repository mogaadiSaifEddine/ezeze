import { Exercice } from './Exercice';
import { SeriesType } from './SeriesTypes';
export class CourseSeries {
  id: string;
  Course_Node_id: string;
  name: string;
  description: string;
  type: SeriesType;
  seriesType?: string;
  exercices: Exercice[];
}
