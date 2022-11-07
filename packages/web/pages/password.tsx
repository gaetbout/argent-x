import { Button, H4, H6, Input, L2 } from "@argent/ui"
import { Box } from "@chakra-ui/react"

import { Layout } from "../components/Layout"

export default function Pin() {
  return (
    <Layout maxW={330}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
        mb={8}
      >
        <H4 textAlign="center">Enter your password</H4>
        <H6 textAlign="center">To log in to itamar@argent.xyz</H6>
      </Box>
      <Input
        placeholder="Password"
        autoFocus
        onChange={(e) => console.log(e.target.value)}
      />
      <L2 as="a" href="#" mt={6} color={"accent.500"}>
        Forgotten your password?
      </L2>
      <Button
        colorScheme={"primary"}
        mt={8}
        onClick={() => console.log("clicked")}
      >
        Continue
      </Button>
    </Layout>
  )
}