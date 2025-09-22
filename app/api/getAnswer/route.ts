import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import {  Question } from "@/app/types";
export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");


    const fileName = 'questions-'+searchParams.get("topic") + '.json';
       
    const filePath = path.join(process.cwd(), "data", fileName);

    const fileData = await fs.readFile(filePath, "utf-8");
    const questionsData: Question[] = JSON.parse(fileData);
    const result: string = questionsData.find((q: Question)  => (
       q.id.toString() === id
    ))?.answer || "Answer not found";
  
    return NextResponse.json(result);
}