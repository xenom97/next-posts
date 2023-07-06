"use client";

import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import SkeletonCard from "./components/SkeletonCard";
import PostCard from "./components/PostCard";
import usePostQuery from "./queries/posts.query";
import { IPost } from "./interfaces/post.interface";
import PostModal from "./components/PostModal";

export default function Home() {
  const { isLoading, data } = usePostQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPost, setCurrentPost] = useState({} as IPost);

  const handleEditPost = (post: IPost) => {
    setCurrentPost(post);
    onOpen();
  };

  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
      {isLoading
        ? new Array(6).fill(null).map((_, i) => <SkeletonCard key={i} />)
        : (data ?? []).map((post, i) => (
            <PostCard key={i} {...post} openModal={handleEditPost} />
          ))}
      <PostModal
        editMode
        isOpen={isOpen}
        onClose={onClose}
        currentValue={currentPost}
      />
    </div>
  );
}
