import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { IPost } from "../interfaces/post.interface";
import usePostQuery from "../queries/posts.query";

interface IPostModalProps {
  isOpen: boolean;
  editMode?: boolean;
  currentValue?: IPost;
  onClose: () => void;
}

const PostModal = ({
  isOpen,
  onClose,
  currentValue,
  editMode,
}: IPostModalProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IPost>();
  const { createPostMutation, updatePostMutation } = usePostQuery();

  const handleFormSubmit = async (data: IPost) => {
    if (editMode) {
      await updatePostMutation.mutateAsync({
        ...currentValue,
        ...data,
      });
    } else {
      await createPostMutation.mutateAsync({
        ...data,
        userId: 1,
      });
    }
    handleClose();
  };

  const handleClose = () => {
    onClose();

    setTimeout(() => {
      reset();
    }, 500);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size={"xl"}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>
          {editMode ? "Edit Post" : "Create a new post"}
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.title}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  id="title"
                  {...register("title", {
                    required: "Title is required",
                    value: currentValue?.title,
                  })}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.body}>
                <FormLabel htmlFor="body">Body</FormLabel>
                <Textarea
                  id="body"
                  {...register("body", {
                    required: "Body is required",
                    value: currentValue?.body,
                  })}
                />
                <FormErrorMessage>
                  {errors.body && errors.body.message}
                </FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                variant={"outline"}
                colorScheme="teal"
                isLoading={createPostMutation.isLoading || isSubmitting}
                className="mb-4"
              >
                {editMode ? "Update" : "Create"}
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostModal;
