export interface QuestionWithoutAnswer {
    id: number;
    question: string;
    options: string[];
}
export interface QuestionAnswer {
    id: number;
    question: string;
    answer: string;
}
export interface Question{
    id: number;
    question: string;
    options: string[];
    answer: string;
}