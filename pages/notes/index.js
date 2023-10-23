import { useQueries } from "@/hooks/useQueries";
import fetcher from "@/utils/fetcher";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

const LayoutComponent = dynamic(() => import("@/layouts"));

export default function Notes({ notes }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const cancelRef = useRef();
  // const [newNotes, setNewNotes] = useState({
  //   title: "",
  //   description: "",
  // });
  const [noteId, setNoteId] = useState(null);
  const [dataNote, setDataNote] = useState();
  // const { data: notes, isLoading } = useQueries({
  //   prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/notes",
  // });
  // const { data: notes, isLoading } = useSWR(
  //   "http://localhost:3000/api/notes",
  //   fetcher,
  //   {
  //     revalidateOnFocus: true,
  //   }
  // );
  const router = useRouter();

  const handleOpenAlert = (id) => {
    onOpen();
    setNoteId(id);
  };

  const HandleDelete = async () => {
    try {
      const response = await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/notes/delete/${noteId}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (result?.success) {
        router.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddModal = () => {
    setNoteId(null);
    setDataNote({
      title: "",
      description: "",
    });
    onModalOpen();
  };

  const handleOpenModal = (id) => {
    onModalOpen();
    async function fetchingData() {
      const res = await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/notes/${id}`
      );
      const listNotes = await res.json();
      setDataNote(listNotes?.data);
    }
    fetchingData();
    setNoteId(id);
  };

  const handleSubmit = async () => {
    if (noteId !== null) {
      try {
        const response = await fetch(
          `https://paace-f178cafcae7b.nevacloud.io/api/notes/update/${noteId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: dataNote?.title,
              description: dataNote?.description,
            }),
          }
        );
        const result = await response.json();
        if (result?.success) {
          onModalClose();
          router.reload();
        }
      } catch (error) {}
    } else {
      try {
        const response = await fetch(
          `https://paace-f178cafcae7b.nevacloud.io/api/notes`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataNote),
          }
        );
        const result = await response.json();
        console.log(response);
        console.log(result);
        if (result?.success) {
          onModalClose();
          router.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <LayoutComponent
        metaTitle={"Notes"}
        metaDescription={"Ini adalah Halaman Notes "}
      >
        {/* {isLoading ? (
          <Flex justifyContent={"center"}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Flex>
        ) : ( */}
        <Box padding="5">
          <Flex justifyContent="end">
            <Button colorScheme="blue" onClick={handleAddModal}>
              Add Notes
            </Button>
          </Flex>
          <Flex>
            <Grid templateColumns="repeat(3, 1fr)" gap={5}>
              {notes?.data?.map((item) => (
                <GridItem key={item.id}>
                  <Card>
                    <CardHeader>
                      <Heading>{item?.title}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>{item?.description}</Text>
                    </CardBody>
                    <CardFooter justify="space-between" flexWrap="wrap">
                      <Button
                        onClick={() => {
                          handleOpenModal(item.id);
                        }}
                        flex="1"
                        variant="ghost"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          handleOpenAlert(item.id);
                        }}
                        flex="1"
                        colorScheme="red"
                      >
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </Flex>
        </Box>
        {/* )} */}
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Notes
              </AlertDialogHeader>
              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={HandleDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <Modal isOpen={isModalOpen} onClose={onModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Notes</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Card border={"none"}>
                <Grid gap="5">
                  <GridItem>
                    <Text>Title</Text>
                    <Input
                      value={dataNote?.title || ""}
                      type="text"
                      onChange={(event) =>
                        setDataNote({ ...dataNote, title: event.target.value })
                      }
                    />
                  </GridItem>
                  <GridItem>
                    <Text>Description</Text>
                    <Textarea
                      value={dataNote?.description || ""}
                      onChange={(event) =>
                        setDataNote({
                          ...dataNote,
                          description: event.target.value,
                        })
                      }
                    />
                  </GridItem>
                </Grid>
              </Card>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onModalClose}>
                Close
              </Button>
              <Button colorScheme="blue" onClick={() => handleSubmit()}>
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </LayoutComponent>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/notes");
  const notes = await res.json();
  return { props: { notes } };
}
