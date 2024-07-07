import { SkeletonCircle, SkeletonText, Box } from "@chakra-ui/react";

export default function ListUsers({ loading, children }) {
  return (
    <>
      {loading ? (
        <Box padding="6" bg="white">
          <SkeletonCircle size="50" />
          <SkeletonText mt="4" noOfLines={2} height="40px" />
          <SkeletonCircle size="50" />
          <SkeletonText mt="4" noOfLines={2} height="40px" />
          <SkeletonCircle size="50" />
          <SkeletonText mt="4" noOfLines={2} height="40px" />
          <SkeletonCircle size="50" />
          <SkeletonText mt="4" noOfLines={2} height="40px" />
        </Box>
      ) : (
        <form>{children}</form>
      )}
    </>
  );
}
