export type Register = 'field' | 'code';

export interface Role {
  id: string;
  period: string;
  title: string;
  org: string;
  orgNote: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  outcomes: string[];
  fieldNote: string;
}

export interface Project {
  id: string;
  index: string;
  name: string;
  kind: string;
  year: string;
  status: string;
  stack: string[];
  summary: string;
  body: string[];
  details: string[];
  finding: string;
  specimen: string;
}

export interface Domain {
  name: string;
  tags: string[];
  line: string;
}

export interface Idea {
  id: string;
  statement: string;
  note: string[];
}

export interface FieldNote {
  number: string;
  date: string;
  status: 'FILED' | 'DRAFT' | 'FRAGMENT';
  title: string;
  tags: string[];
  body: string[];
  margin?: string;
}

export interface Contradiction {
  left: string;
  right: string;
  note: string;
}
