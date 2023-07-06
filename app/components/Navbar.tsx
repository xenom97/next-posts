"use client";
import { Button, Heading, useDisclosure } from "@chakra-ui/react";
import PostModal from "./PostModal";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const path = usePathname();

  return (
    <nav className="sticky top-0 z-10 bg-white flex justify-between items-center py-6 px-8 shadow-md">
      <Heading size={"lg"}>Posts</Heading>

      {path === "/" ? (
        <>
          <Button
            variant={"outline"}
            colorScheme="teal"
            size={"md"}
            onClick={onOpen}
          >
            Create a new post
          </Button>

          <PostModal isOpen={isOpen} onClose={onClose} />
        </>
      ) : null}
    </nav>
  );
};

export default Navbar;
