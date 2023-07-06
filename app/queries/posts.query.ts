import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../services/posts.service";

export default function usePostQuery() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast({
        description:
          "Congratulations! Your post has been successfully created.",
        status: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast({
        description: "Oops! Unable to create the post.",
        status: "error",
      });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast({
        description:
          "Congratulations! Your post has been successfully deleted.",
        status: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast({
        description: "Oops! Unable to delete the post.",
        status: "error",
      });
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      toast({
        description:
          "Congratulations! Your post has been successfully updated.",
        status: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast({
        description: "Oops! Unable to update the post.",
        status: "error",
      });
    },
  });

  return {
    isLoading,
    data,
    createPostMutation,
    deletePostMutation,
    updatePostMutation,
  };
}
