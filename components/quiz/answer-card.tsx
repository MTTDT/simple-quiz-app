
"use client"
import { QuestionWithoutAnswer } from "@/app/types"
import { Card, CardBody, CardHeader, Heading, VStack, Button, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useColorModeValue } from "../ui/color-mode"


interface QuestionCardProps {
    q: QuestionWithoutAnswer
    answer: string | null
    selected: number | null
  }
  
export function AnswerCard({ q, answer, selected }: QuestionCardProps) {    
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [correctOption, setCorrectOption] = useState<string | null>(null)   

  const cardBg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.600")
  const selectedBg = useColorModeValue("blue.50", "blue.900")
  const correctBg = useColorModeValue("green.50", "green.900")

  const selectedBorderColor = useColorModeValue("blue.500", "blue.300")
  const hoverBg = useColorModeValue("gray.50", "gray.700")

  useEffect(() => {
    setSelectedOption(selected)
    setCorrectOption(answer)
  }, [selected, answer])

  return (
    <Card.Root maxW="md" bg={cardBg} borderColor={borderColor} borderWidth="1px" shadow="lg" mx="auto">
      <CardHeader pb={4}>
        <Heading size="xl" textAlign="center" >
          {q.question}
        </Heading>
      </CardHeader>

      <CardBody pt={0}>
        <VStack spaceY={3} align="stretch">
          {q.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              size="md"
              textAlign="left"
              justifyContent="flex-start"
              whiteSpace="normal"
              height="auto"
              py={4}
              px={4}
              bg={correctOption === q.options[index] ? correctBg : (selectedOption === index ? selectedBg : "transparent")}
              
              borderColor={selectedOption === index ? selectedBorderColor : borderColor}
              borderWidth="2px"
              _hover={{
                bg: selectedOption === index ? selectedBg : hoverBg,
                transform: "translateY(-1px)",
                shadow: "md",
              }}
              _active={{
                transform: "translateY(0)",
              }}
              transition="all 0.2s"
            >
              <Text fontSize="sm" fontWeight="medium">
                {option}
              </Text>
            </Button>
          ))}
          {
            correctOption === q.options[selectedOption ?? -1] ? (
                <Text color="green.500" fontWeight="bold" textAlign="center">Correct!</Text>
            ):(
                <Text color="red.500" fontWeight="bold" textAlign="center">Incorrect!</Text>
            )
          }
        </VStack>
      </CardBody>
    </Card.Root>
  )
}
