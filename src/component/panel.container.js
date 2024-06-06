import {
  Box,
  Button,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { MdOutlineMessage } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
export const PanelContainer = ({ setSelectedNode, selectedNode, setNodes }) => {
  return (
    <Box
      sx={{
        width: "500px",
        height: "100%",
        borderLeft: "2px solid #f3f3f3",
        p: !selectedNode && "20px",
      }}
    >
      {selectedNode ? (
        <SettingPanel
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
          setNodes={setNodes}
        />
      ) : (
        <NodePanel />
      )}
    </Box>
  );
};
const NodePanel = () => {
  return (
    <>
      <SimpleGrid columns={2} spacing={4}>
        <Button
          draggable
          height="80px"
          onDragStart={(event) => {
            event.dataTransfer.setData(
              "new_node_data",
              JSON.stringify({
                id: nanoid(), // important for React Flow to render node onto canvas and must be unique
                type: "textUpdater", //can be made dynamic if other nodes are present
              })
            );
            event.dataTransfer.effectAllowed = "move";
          }}
          sx={{
            border: "2px solid #6d7ab7",
            cursor: "move",
            borderRadius: "6px",
            flexDir: "column",
            bgColor: "#fff",
          }}
        >
          <Icon as={MdOutlineMessage} boxSize={"30px"} fill={"#6d7ab7"} />
          <Text color={"#6d7ab7"}>Message</Text>
        </Button>
        {/* Multiple Nodes can be added here as Buttons */}
      </SimpleGrid>
    </>
  );
};

const SettingPanel = ({ selectedNode, setSelectedNode, setNodes }) => {
  const [textValue, setTextValue] = useState(selectedNode.data.text);
  return (
    <Box>
      <Flex
        justifyContent={"space-between"}
        fontSize={"18px"}
        fontWeight={"700"}
        p={3}
        borderBottom={"2px solid #f3f3f3"}
        alignItems={"center"}
      >
        <Icon
          as={IoMdArrowRoundBack}
          boxSize={"20px"}
          cursor={"pointer"}
          onClick={() => {
            setNodes((prevNodes) =>
              prevNodes.map((node) =>
                node.id === selectedNode.id
                  ? { ...node, selected: false }
                  : node
              )
            );
            setSelectedNode(null);
          }}
        />
        Message
      </Flex>
      <Box p={3} borderBottom={"2px solid #f3f3f3"}>
        <Text mb={2}>Text</Text>
        <Textarea
          placeholder="Enter the message"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
      </Box>
      <Button
        mt={4}
        ml={"10px"}
        sx={{ bgColor: "#fff", border: "1px solid #6c7ab6" }}
        onClick={() => {
          setNodes((prevNodes) =>
            prevNodes.map((node) =>
              node.id === selectedNode.id
                ? {
                    ...node,
                    data: { ...node.data, text: textValue },
                    selected: false,
                  }
                : node
            )
          );
          setSelectedNode(null);
        }}
      >
        Save
      </Button>
    </Box>
  );
};
