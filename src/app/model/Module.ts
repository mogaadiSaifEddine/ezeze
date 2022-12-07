import { Chapter } from "./Chapter";
import { Course } from "./Course";

export interface Module {
    id: number;
    name: string;
    chapter:Chapter[];
    course:Course[];
  }