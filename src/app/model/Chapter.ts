import { Module } from './Module';
import { Course } from './Course';
import { CourseSeries } from './CourseSeries';
import { Exercice } from './Exercice';
import { prerquis } from './prerquis';

export interface Chapter {
  chapterType: string;
  chapter_id: number;
  children: ChapterChildren[];
  name: string;
  url: string;
  pre_required_chapterList: prerquis[];
  resumer_courList: any;
  catre_conceptuelles?: any;
  catre_conceptuelle: any;
  exerciceSeries: CourseSeries;
  exercices: Exercice[];
  course: any;
}

export interface ChapterChildren {
  chapter_id: number;
  name: string;
  url: string;
  pre_required_chapterList: prerquis[];
  resumer_courList: any;
  catre_conceptuelles?: any;
  catre_conceptuelle: any;
  exerciceSeries: CourseSeries;
  exercices: Exercice[];
}

export enum ChapterType {
  MATIERE = 0,
  CHAPTER = 1
}

export enum Trimestre {
  FIRST_TRIMESTER = 'Premier Trimestre',
  SECOND_TRIMESTER = 'Deuxième Trimestre',
  THIRD_TRIMESTER = 'Troisième Trimestre'
}
