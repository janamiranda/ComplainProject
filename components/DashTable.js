import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

import {
  Box,
  TableCaption,
  Stack,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  Button,
  Heading,
  useColorModeValue,
  Modal,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Select,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ViewIcon, AddIcon } from "@chakra-ui/icons";

import { useRouter } from "next/router";

import useSWR from "swr";

import fetcher from "../lib/fetcher";

export default function DashTable(props) {
  const [cookies] = useCookies();
  const router = useRouter();

  const { data, error } = useSWR(
    ["/api/complaints/", cookies.userToken],
    fetcher
  );

  if (!cookies.userToken) {
    router.push("/companyDashboard");
    return null;
  }

  return (
    <>
      <Stack spacing={8} mx={"auto"} maxW={"70%"} py={12} px={1}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>My complaints</Heading>
        </Stack>
        <Box
          mt="1"
          fontWeight="semibold"
          lineHeight="tight"
          isTruncated
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={6}
        >
          <Table variant="striped" colorScheme="orange">
            <TableCaption>That is your list of complaints</TableCaption>
            <Thead>
              <Tr>
                <Th>Status</Th>
                <Th>Protocol Number</Th>
                <Th>Company</Th>
                <Th>Complaint</Th>
                <Th>Rate</Th>
                <Th>
                  <Button>
                    <a href="./complaint">Add complain</a>
                  </Button>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data && data.map((item) => <TableRow item={item} />)}
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
            Back to Home
          </Button>
        </Box>
      </Stack>
    </>
  );
}
const TableRow = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenRate,
    onOpen: isOnOpenRate,
    onClose: isOnCloseRate,
  } = useDisclosure();

  return (
    <>
      <Tr key={props.item.id}>
        <Td>{props.item.status}</Td>
        <Td>{props.item.id}</Td>
        <Td>{props.item.company.name}</Td>
        <Td>
          <Button
            align={"center"}
            justify={"center"}
            bg={"orange.400"}
            color={"white"}
            _hover={{
              bg: "orange.500",
            }}
            onClick={onOpen}
          >
            <ViewIcon w={6} h={6} />
          </Button>
        </Td>
        <Td>
          {props.item.status == "In Progress" ? (
            "Complain in progress"
          ) : props.item.status == "Closed" && !props.item.rate ? (
            <Button
              align={"center"}
              justify={"center"}
              bg={"orange.400"}
              color={"white"}
              _hover={{
                bg: "orange.500",
              }}
              onClick={isOnOpenRate}
            >
              <AddIcon w={6} h={6} />
            </Button>
          ) : (
            props.item.rate
          )}
        </Td>
        <Td></Td>
        <ComplaintModal
          isOpen={isOpen}
          onClose={onClose}
          userMessage={props.item.complain}
          title={props.item.title}
          complain_id={props.item.id}
          messages={props.item.complain_message}
          status={props.item.status}
        />

        <RateModal
          complain_id={props.item.id}
          onOpen={isOpenRate}
          onClose={isOnCloseRate}
        />
      </Tr>
    </>
  );
};

const ComplaintModal = (props) => {
  const { onToggle } = useDisclosure();
  const [error, setError] = useState("");
  const router = useRouter();

  const isThereResponse = props.messages.length == 0 ? false : true;

  const onSubmit = async (data) => {
    const response = await fetch(`/api/complaints/close/${data}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      setError("Something went wrong");
    }
  };
  const closeComplain = async (data) => {
    swal({
      title: "Are you sure?",
      text: "Once you close it, you can reopen it!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      const responseStatus = await onSubmit(data);
      if (willDelete && responseStatus.status == 200) {
        swal("Your complaint has been closed", {
          icon: "success",
        });
        router.push("/companyDashboard");
      } else {
        swal("Your complaint remains open!");
      }
    });
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalCloseButton />
        <span>{error}</span>
        <ModalBody>
          <div>
            <b>Your message:</b>
            <div style={{ height: 75 }}>{props.userMessage}</div>
            {isThereResponse ? (
              <div style={{ textAlign: "right", height: 125 }}>
                <b> Company message: </b>
                {props.messages.map((item) => {
                  return <div>{item.complain_message}</div>;
                })}
              </div>
            ) : null}
          </div>

          {props.status === "Closed" ? null : (
            <Button
              onClick={onToggle}
              width={"100%"}
              bg={"red"}
              color={"gray.700"}
              onClick={() => {
                closeComplain(props.complain_id);
              }}
            >
              Close complaint
            </Button>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const RateModal = (props) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const router = useRouter();

  const onSubmit = async (data) => {
    const response = await fetch(`/api/complaints/rate/${props.complain_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status >= 200 && response.status < 300) {
      return router.push("/companyDashboard");
    } else {
      setError("Something went wrong");
    }
  };

  return (
    <Modal isOpen={props.onOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>{props.title}</ModalHeader>
        <ModalCloseButton />
        <span>{error}</span>
        <ModalBody>
          <Box p="15px" rounded="md">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="rate">
                <FormLabel>Rate</FormLabel>
                <Select placeholder="Select option" {...register("rate")}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Select>
              </FormControl>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Save
                </Button>
              </ModalFooter>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
