import React from "react";
import QuizClient from "./quiz-client";
import { connection } from "next/server";

export default async function Page() {
    await connection();
  return <QuizClient />;
}