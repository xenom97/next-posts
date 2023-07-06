"use client";

import PostCard from "@/app/components/PostCard";
import SkeletonCard from "@/app/components/SkeletonCard";
import { IPost } from "@/app/interfaces/post.interface";
import usePostDetailQuery from "@/app/queries/post-detail.query";

export default function DetailPage({ params }: { params: { id: string } }) {
  const { isLoading, data } = usePostDetailQuery(+params.id);

  return (
    <div className="container mx-auto">
      {isLoading ? (
        <SkeletonCard />
      ) : (
        <PostCard hideActions {...(data as IPost)} />
      )}
    </div>
  );
}
