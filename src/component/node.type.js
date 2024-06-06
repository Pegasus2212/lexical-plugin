import { Box, Flex, Icon } from "@chakra-ui/react";
import React, { memo } from "react";
import { MdOutlineMessage } from "react-icons/md";
import { Handle, Position } from "reactflow";
import { RiWhatsappFill } from "react-icons/ri";
import { nanoid } from "nanoid";

export const TextUpdaterNode = memo(({ data, isConnectable, selected }) => {
  return (
    <Box
      sx={{
        width: "400px",
        outline: selected && "2px solid #6c7ab6",
        height: "100%",
        bgColor: "#fff",
        boxShadow: "0px 0px 10px 1px rgb(0,0,0,0.3)",
        borderRadius: "10px",
      }}
    >
      {" "}
      <Handle
        type="target"
        position={Position.Left}
        id={data.target_id}
        style={{ width: "10px", height: "10px" }}
        isConnectable={isConnectable}
      />
      <Flex
        sx={{
          width: "100%",
          bgColor: "#b2f0e3",
          p: "10px",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Flex fontWeight={700} gap={"7px"} alignItems={"center"}>
          <Icon as={MdOutlineMessage} boxSize={"20px"} />
          Send Message
        </Flex>
        <Icon as={RiWhatsappFill} boxSize={"24px"} fill={"#2bb03f"} />
      </Flex>
      <Flex sx={{ p: "10px" }}>
        {!data.text.length ? "Select the Node to enter message..." : data.text}
      </Flex>{" "}
      <Handle
        type="source"
        position={Position.Right}
        id={data.source_id}
        style={{ width: "10px", height: "10px" }}
        isConnectable={isConnectable}
      />
    </Box>
  );
});
