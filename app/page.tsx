import { Button, HStack } from "@chakra-ui/react"
import Header from "@/components/home-page/header"
import TopicCard from "@/components/home-page/topic-card"
export default function Home() {
  const topics = ["Cyber Security", "Renewable Energy", "Finance Literacy"]
  return (
    <main className="min-h-screen">
      <Header  />
      <HStack justifyContent={"center"} alignItems={"center"} height={"100vh"}>
        {topics.map((topic) => (
          <TopicCard key={topic} topic={topic}/>
        ))}
      </HStack>
    </main>
  )
}
