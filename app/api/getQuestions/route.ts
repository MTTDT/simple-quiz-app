import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { QuestionWithoutAnswer, Question } from "@/app/types";
export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);
    const fileName = 'questions-'+searchParams.get("topic") + '.json';
    
    const filePath = path.join(process.cwd(), "data", fileName);

    const fileData = await fs.readFile(filePath, "utf-8");
    const questionsData: Question[] = JSON.parse(fileData);
    const result: QuestionWithoutAnswer[] = questionsData.map((q: QuestionWithoutAnswer)  => ({
        id: q.id,
        question: q.question,
        options: q.options,
    }));
  
    return NextResponse.json(result);
}