import { Button, Flex, useToast } from "@chakra-ui/react";
import React from "react";

export const TopbarContainer = ({ nodes }) => {
  const toast = useToast();
  const checkAllConnected = () => {
    const emptyTargetNodeExist = nodes.find(
      (node) => !node.data.target_connected
    );
    if (emptyTargetNodeExist) {
      toast({
        position: "top",
        status: "error",
        variant: "solid",
        title: "Cannot save flow",
        duration: 2500,
        containerStyle: {
          fontWeight: 400,
        },
      });
    } else {
      toast({
        position: "top",
        status: "success",
        variant: "solid",
        title: "Flow saved successfully",
        duration: 2500,
        containerStyle: {
          fontWeight: 400,
        },
      });
    }
  };
  return (
    <Flex
      sx={{
        width: "100%",
        height: "100px",
        bgColor: "#f3f3f3",
        p: "20px",
        justifyContent: "right",
        alignItems: "center",
      }}
    >
      <Button
        onClick={checkAllConnected}
        sx={{
          border: "2px solid #6d7ab7",
          color: "#6d7ab7",
          bgColor: "#fff",
          px: "40px",
        }}
      >
        Save Changes
      </Button>
    </Flex>
  );
};
