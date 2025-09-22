
"use client"
import { QuestionWithoutAnswer } from "@/app/types"
import { Card, CardBody, CardHeader, Heading, VStack, Button, Text } from "@chakra-ui/react"
import { useState } from "react"
import { useColorModeValue } from "../ui/color-mode"


interface QuestionCardProps {
    q: QuestionWithoutAnswer
    onAnswerSelect?: (index: number) => void
    setViewAnswer?: (view: boolean) => void
  }
  
  export function QuestionCard({ q, onAnswerSelect, setViewAnswer }: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  const cardBg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.600")
  const selectedBg = useColorModeValue("blue.50", "blue.900")
  const selectedBorderColor = useColorModeValue("blue.500", "blue.300")
  const hoverBg = useColorModeValue("gray.50", "gray.700")

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index)
    onAnswerSelect?.(index)
  }

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
              bg={selectedOption === index ? selectedBg : "transparent"}
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
              onClick={() => handleOptionSelect(index)}
            >
              <Text fontSize="sm" fontWeight="medium">
                {option}
              </Text>
            </Button>
           
          ))}
          {
            selectedOption !== null && 
            <Text mx={'auto'} _hover={{color: 'green.300', cursor: 'pointer', textDecoration: 'underline'}} onClick={() => setViewAnswer?.(true)}>
                View Answer
            </Text>
          }
           
        </VStack>
      </CardBody>
    </Card.Root>
  )
}
