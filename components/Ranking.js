import React, { useState } from "react";
import { useCookies } from "react-cookie";

import {
  Flex,
  Box,
  TableCaption,
  Stack,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Tfoot,
  Tbody,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import useSWR from "swr";

import fetcher from "../lib/fetcher";

export default function DashTable(props) {
  // const [cookies, setCookie, removeCookie] = useCookies();
  const { data, error } = useSWR(["/api/companies"], fetcher);

  console.log(data);
  const [count, setCount] = useState(0);

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  return (
    <>
      <Flex
        minH={"70vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={1}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Ranking</Heading>
          </Stack>
          <Box
            align={"center"}
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            w="120%"
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={6}
          >
            <Table variant="simple">
              <TableCaption>
                Here is the list of companies that solved the most and those
                that least solved{" "}
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Best Companies</Th>
                  <Th>Worst Companies</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>COMPANY 1</Td>
                  <Td>COMPANY 1</Td>
                </Tr>
                <Tr>
                  <Td>COMPANY 2</Td>
                  <Td>COMPANY 2</Td>
                </Tr>
                <Tr>
                  <Td>COMPANY 3</Td>
                  <Td>COMPANY 3</Td>
                </Tr>
                <Tr>
                  <Td>COMPANY 4</Td>
                  <Td>COMPANY 4</Td>
                </Tr>
                <Tr>
                  <Td>COMPANY 5</Td>
                  <Td>COMPANY 5</Td>
                </Tr>
              </Tbody>
            </Table>

            <Button
              align={"center"}
              justify={"center"}
              bg={"orange.400"}
              color={"white"}
              _hover={{
                bg: "orange.500",
              }}
            >
              {" "}
              <a href="/"> Back to Home </a>
            </Button>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
