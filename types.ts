export type FieldId = 
  | 'engineering' 
  | 'medical' 
  | 'cs_it' 
  | 'business' 
  | 'design_arts' 
  | 'social_sciences';

export interface QuizOption {
  id: string;
  text: string;
  field: FieldId;
}

export interface SimpleQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface FieldRecommendation {
  id: FieldId;
  name: string;
  subtitle: string;
  explanation: string;
  whatToStudy: string[];
  careerPaths: string[];
}

export interface GuideTip {
  id: number;
  title: string;
  text: string;
}
