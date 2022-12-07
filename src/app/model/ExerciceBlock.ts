import { ExerciceBlockTypes } from './ExerciceBlockTypes';

export interface ExerciceBlock {
  exerciceBlockId: string;
  exerciceId: string;
  exerciceBlockType: ExerciceBlockTypes;
  label: string;
  correctValue: string;
  isAdmissable: boolean;
  placeholder: string;
  value: string | boolean;
  blockOrder: number;
}
