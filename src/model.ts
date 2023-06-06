import {DateTime} from 'luxon'

export type UserT = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  location: string;
  joinDate: DateTime;
  available: boolean;
  instrument_1: string;
  instrument_2: string;
  instrument_3: string;
  prof_pic_path: string;
  job1: string;
  job1Location: string;
  job2: string;
  job2Location: string;
  coverPicPath: string;
  accepted?: boolean;
}

export type ProjectT = {
  id: number;
  name: string;
  ensemble_name: string;
  owner_id: number;
  description: string;
  backgroundColor: string;
  color: string;
  starred: boolean;
  past: boolean;
  upcoming: boolean;
  ongoing: boolean;
  last: DateTime;
  first: DateTime;
  collaborators: UserT[];
  accepted: boolean;
}

export type DateT = {
  id: number;
  name: string;
  tempId?: number;
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

export type PieceT = {
  id: number;
  name: string;
  composer: string;
  projectId: number;
  tempId?: number;
}

export type GeneralInfoT = {
  name: string;
  ensemble_name: string;
  description: string;
  repertoire: PieceT[];
  backgroundColor: string;
  color: string;
}