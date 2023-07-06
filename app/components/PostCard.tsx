import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { IPost } from "../interfaces/post.interface";
import Link from "next/link";
import usePostQuery from "../queries/posts.query";

interface IPostCardProps extends IPost {
  hideActions?: boolean;
  openModal?: (post: IPost) => void;
}

const PostCard = (props: IPostCardProps) => {
  const { deletePostMutation } = usePostQuery();

  const handleEdit = () => {
    props.openModal &&
      props.openModal({
        title: props.title,
        body: props.body,
        userId: props.userId,
        id: props.id,
      });
  };

  const Actions = () => {
    if (props.hideActions) return null;

    return (
      <div className="flex space-x-2">
        <Link href={`/post/${props.id}`}>
          <IconButton
            colorScheme="blue"
            variant={"outline"}
            size={"sm"}
            aria-label="View post"
            icon={<ViewIcon />}
          />
        </Link>

        <IconButton
          colorScheme="yellow"
          variant={"outline"}
          size={"sm"}
          aria-label="Edit post"
          icon={<EditIcon />}
          onClick={handleEdit}
        />

        <Popover>
          {({ onClose }) => (
            <>
              <PopoverTrigger>
                <IconButton
                  colorScheme="red"
                  variant={"outline"}
                  size={"sm"}
                  aria-label="Delete post"
                  icon={<DeleteIcon />}
                />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Confirmation!</PopoverHeader>
                <PopoverBody>
                  Are you sure you want to delete this post? This action cannot
                  be undone.
                </PopoverBody>
                <PopoverFooter className="flex justify-end space-x-1">
                  <Button
                    colorScheme="red"
                    variant="outline"
                    size={"sm"}
                    isLoading={deletePostMutation.isLoading}
                    onClick={async () => {
                      await deletePostMutation.mutateAsync(props.id!);
                      onClose();
                    }}
                  >
                    Yes
                  </Button>
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    size={"sm"}
                    onClick={onClose}
                  >
                    No
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </>
          )}
        </Popover>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center space-x-2">
        <Heading size="md" className="truncate">
          {props.title}
        </Heading>

        <Actions />
      </CardHeader>

      <CardBody>
        <Text>{props.body}</Text>
      </CardBody>
    </Card>
  );
};

export default PostCard;
