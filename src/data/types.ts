/** 'idea' sections talk about people and problems; 'system' sections show how things are built. */
export type Register = 'idea' | 'system';

export interface Capability {
  id: string;
  index: string;
  world: 'BUILD' | 'AUTOMATE' | 'TRADE' | 'GROW' | 'EXPERIMENT';
  name: string;
  line: string;
  summary: string;
  services: string[];
  flow?: string[];
  flowLabel?: string;
  stack: string[];
  message: string;
  disclaimer?: string;
}

export interface Project {
  id: string;
  index: string;
  name: string;
  kind: string;
  label: 'Internal' | 'Experimental' | 'Concept' | 'In development';
  stack: string[];
  summary: string;
  body: string[];
  details: string[];
  demonstrates: string;
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

export interface LabItem {
  number: string;
  project: string;
  type: string;
  stack: string;
  status: 'Experimental' | 'Prototype' | 'Research' | 'Concept';
  note: string;
}

export interface Pair {
  left: string;
  right: string;
  note: string;
}

export interface Stage {
  name: string;
  question: string;
  log: string;
}
