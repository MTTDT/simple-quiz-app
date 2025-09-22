import { HStack } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { IconButton } from "@chakra-ui/react"

export default function Header(){
    return (
        <HStack justifyContent={"flex-end"} p={4}>

            <ColorModeButton size='lg' className="right-0"/>
        </HStack>
    )
}