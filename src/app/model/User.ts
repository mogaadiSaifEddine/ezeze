import { INavData } from '@coreui/angular';
import { Trimestre } from './Chapter';

export class User {
  user_id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  datenaissance: Date;
  phone: number;
  sexe: string;
  profession: string;
  password: string;
  confirmepassword: string;
  isblocked: boolean;
  enabled: boolean;
  group: Group;
}
export interface Group {
  id: number;
  name: string;
  description?: null;
  chaptersList: INavData[];
}

export interface Chapter {
  catre_conceptuelle: any;
  resume_cour: any;
  trimestre: Trimestre;
  chapter_id: number;
  name: string;
  sousChapitres: any[];
  exerciceSeries: any[];
  group?: Group;
  coursePRstring?: string;
}
export class MinimizedUser {
  user_id: number;
  name: string;
  photo: string;
}
export class School {
  school_id: number;
  name: string;
}
