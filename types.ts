
export enum Category {
  HEMODYNAMICS = 'Hemodynamics & Cardiology',
  VENTILATION = 'Pulmonary & Ventilation',
  NEURO = 'Neurological Care',
  SEPSIS = 'Sepsis & Multi-Organ Failure',
  PHARMACOLOGY = 'Critical Care Pharmacology',
  GENERAL = 'General Critical Care'
}

export enum Difficulty {
  EASY = 'Novice',
  MEDIUM = 'Proficient',
  HARD = 'Expert'
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  rationale: string;
  category: Category;
  difficulty: Difficulty;
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: (number | null)[];
  timeRemaining: number;
  isComplete: boolean;
  score: number;
}

export interface QuizConfig {
  categories: Category[];
  difficulty: Difficulty;
  questionCount: number;
  timeLimitMinutes: number;
}
