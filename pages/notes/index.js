import { useQueries } from "@/hooks/useQueries";
import fetcher from "@/utils/fetcher";
import {
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
  Spinner,
  Text,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const LayoutComponent = dynamic(() => import("@/layouts"));

export default function Notes() {
  // const { data: notes, isLoading } = useQueries({
  //   prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/notes",
  // });
  const { data: notes, isLoading } = useSWR(
    "https://paace-f178cafcae7b.nevacloud.io/api/notes",
    fetcher,
    { revalidateOnFocus: true }
  );
  const router = useRouter();

  const HandleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/notes/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (result?.success) {
        router.reload();
      }
    } catch (error) {}
  };

  return (
    <>
      <LayoutComponent
        metaTitle={"Notes"}
        metaDescription={"Ini adalah Halaman Notes "}
      >
        {isLoading ? (
          <Flex justifyContent={"center"}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Flex>
        ) : (
          <Box padding="5">
            <Flex justifyContent="end">
              <Button
                colorScheme="blue"
                onClick={() => router.push("/notes/add")}
              >
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
                          onClick={() => router.push(`/notes/edit/${item?.id}`)}
                          flex="1"
                          variant="ghost"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => HandleDelete(item?.id)}
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
        )}
      </LayoutComponent>
    </>
  );
}

// export async function getStaticProps() {
//   const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
//   const notes = await res.json();
//   return { props: { notes }, revalidate: 10 };
// }
