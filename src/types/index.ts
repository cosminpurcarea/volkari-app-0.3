export interface TrainingSession {
  numberOfQuestions: number;
  secondsPerQuestion: number;
}

export interface Noun {
  word: string;
  article: 'der' | 'die' | 'das';
  translation: string;
}

export interface TrainingResult {
  date: string;
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
}