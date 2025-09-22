"use client"
import { useEffect, useState } from "react"
import {getQuestions, getAnswer} from '@/app/api_req'
import { QuestionCard } from "@/components/quiz/question-card"
import { Button, HStack, Stack, Text, Spinner, VStack, Link } from "@chakra-ui/react"
import { QuestionWithoutAnswer } from "@/app/types"
import { useSearchParams } from "next/navigation";
import Header from "@/components/home-page/header"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { AnswerCard } from "@/components/quiz/answer-card"

export default function Page(){
    const [questions, setQuestions] = useState<QuestionWithoutAnswer[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [failed, setFailed] = useState<boolean>(false)
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [viewAnswer, setViewAnswer] = useState<boolean>(false)
    const [correctAnswer, setCorrectAnswer] = useState<string | null>(null)
    const [selectedOption, setSelectedOption] = useState<number | null>(null)

    const searchParams = useSearchParams();
    const topic = searchParams.get("topic");


    useEffect(() => {
        async function getData(){
            setLoading(true)
            try{
                const data: QuestionWithoutAnswer[] = await getQuestions(topic)
                setQuestions(data)
                setLoading(false)

            }catch(err){
                setFailed(true)
                setLoading(false)
            }

        }
        getData()
    },[])
    useEffect(() => {
        async function getAnswerData(){
            try{
                console.log("Fetching answer for question id:", questions[currentIndex]?.id, topic);
                const answer = await getAnswer(questions[currentIndex].id, topic)
                setCorrectAnswer(answer)
                

            }catch(err){
                setCorrectAnswer(null)
            }
        }
        getAnswerData()
    }
    ,[currentIndex, questions, topic])
    useEffect(() => {
        setViewAnswer(false)
        setSelectedOption(null)
    }, [currentIndex])
    if(loading){
        return (
            <VStack colorPalette="teal" mt={'40vh'}>
                <Spinner color="colorPalette.600" />
                <Text color="colorPalette.600">Loading...</Text>
            </VStack>)
    }
    if(failed){
        return <div>Incorrect topic. Please try again later.</div>
    }

    return (
        <Stack>
            <Header />
            {
                (questions.length === 0) ? (
                    <></>
                ) : 
                (
                    <div className="min-h-screen px-4 ">
                        <Stack minH={'60vh'}>
                            {
                                viewAnswer ?
                                <AnswerCard key={questions[currentIndex].question} q={questions[currentIndex]} selected={selectedOption} answer={correctAnswer}/>
                                :
                                <QuestionCard key={questions[currentIndex].id} q={questions[currentIndex]} setViewAnswer={setViewAnswer} onAnswerSelect={setSelectedOption} />

                            }
                        </Stack>
                        <HStack justify={'space-between'} mx={'30vw'} mt={4} >
                            {currentIndex > 0 ? (
                                <Button
                                onClick={() => setCurrentIndex(currentIndex - 1)}
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2 rounded-full px-4 py-2 hover:scale-105 transition-transform"
                                >
                                <ChevronLeft className="w-4 h-4" />
                                Previous
                                </Button>
                            ) : (
                                <div></div>
                            )}

                            {currentIndex < questions.length - 1 ? (
                                <Button
                                onClick={() => setCurrentIndex(currentIndex + 1)}
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2 rounded-full px-4 py-2 hover:scale-105 transition-transform"
                                >
                                Next
                                <ChevronRight className="w-4 h-4" />
                                </Button>
                            ) : (
                                <div></div>
                            )}
                            </HStack>
                            <HStack >
                            {currentIndex === questions.length - 1 ? (
                                <Link href={'/'} mt={3} mx={'auto'} >
                                <Button
                                px={7}
                                variant="outline"
                                size="sm"
                                className=" gap-2 px-4 py-2 hover:scale-105 transition-transform"
                                >
                                Finish
                                </Button>
                                </Link>
                            ) : (
                                <div></div>
                            )}
                            </HStack>

                    </div>
                )
            }
            
        
        </Stack>
    )
}