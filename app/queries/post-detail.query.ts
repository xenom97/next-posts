import { useQuery } from "@tanstack/react-query";
import { getPostDetail } from "../services/posts.service";

export default function usePostDetailQuery(postId: number) {
  const { isLoading, data } = useQuery({
    queryKey: ["postDetail", postId],
    queryFn: () => getPostDetail(postId),
  });

  return { isLoading, data };
}
