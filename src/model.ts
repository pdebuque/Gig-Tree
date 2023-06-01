import {DateTime} from 'luxon'

export type UserT = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  location: string;
  joinDate: DateTime;
  available: boolean;
  instrument1: string;
  instrument2: string;
  instrument3: string;
  prof_pic_path: string;
  job1: string;
  job1Location: string;
  job2: string;
  job2Location: string;
  coverPicPath: string;
}

export type Project = {
  id: number;
  name: string;
  ensembleName: string;
  ownerId: number;
  description: string;
  backgroundColor: string;
  color: string;
}

export type DateT = {
  name: string;
  location: string;
  date: DateTime;
  start: DateTime;
  end: DateTime;
  project_id: number;
  type: string;
  notes: string;
  project_name: string;
  ensemble_name: string;
  backgroundColor: string;
  color: string;
}

export type Piece = {
  id: number;
  name: string;
  composer: string;
  projectId: number;
}
