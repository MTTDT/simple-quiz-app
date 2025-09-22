import { HStack, Heading, VStack } from "@chakra-ui/react"
import Header from "@/components/home-page/header"
import TopicCard from "@/components/home-page/topic-card"
export default function Home() {
  const topics = ["Cyber Security", "Renewable Energy", "Finance Literacy"]
  return (
    <main className="min-h-screen">
      <Header  />        

      <VStack justifyContent={"center"} alignItems={"center"} height={"100vh"}>
        <Heading size='4xl'   mb={35} >Choose the topic you want to learn about!</Heading>
        <HStack mb={'20vh'} wrap={'wrap'} justifyContent={'center'} >
        {topics.map((topic) => (
          <TopicCard key={topic} topic={topic}/>
        ))}
        </HStack>
      </VStack>
    </main>
  )
}
