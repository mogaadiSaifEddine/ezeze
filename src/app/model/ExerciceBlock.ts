import { ExerciceBlockTypes } from './ExerciceBlockTypes';

export interface ExerciceBlock {
  exerciceBlockId: string;
  exercice_Block_Id?: number;
  exerciceId: string;
  exerciceBlockType: ExerciceBlockTypes;
  label: string;
  correctValue: string;
  isAdmissable: boolean;
  placeholder: string;
  value: string | boolean;
  blockOrder: number;
  files: any[];
  blockParams?: Object | string | null | undefined;
  blockFileList: any[];
}
