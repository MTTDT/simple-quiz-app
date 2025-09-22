import { Card, Image, Button, Link } from "@chakra-ui/react";
import { Title } from "chart.js";


export default function TopicCard({topic}: {topic: string}) {
    console.log(topic);
    return(
        <Link href={`/quiz?topic=${topic.toLowerCase().replaceAll(' ','-')}`} _hover={{ textDecoration: 'none' }}
        >
                <Card.Root
                >
                    <Card.Body>
                        <Card.Title mt={2} fontSize="xl" fontWeight="bold">{topic}</Card.Title>
                    </Card.Body>
                </Card.Root>
        </Link>
    )
}