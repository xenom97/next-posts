import { Card, SkeletonText } from "@chakra-ui/react";

const SkeletonCard = () => {
  return (
    <Card padding="6" boxShadow="lg" bg="white">
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
    </Card>
  );
};

export default SkeletonCard;
