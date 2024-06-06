import { ChakraProvider, Flex } from "@chakra-ui/react";
import React, { useCallback, useRef, useState } from "react";
import { TopbarContainer } from "./component/topbar.container";
import { PanelContainer } from "./component/panel.container";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { TextUpdaterNode } from "./component/node.type";
import { nanoid } from "nanoid";

// Either by using memo or defining it inside the component using callback will help us declare customNode
const nodeTypes = { textUpdater: TextUpdaterNode };

// Intial state of nodes and edges
const initialNodes = [
  {
    id: "5EofZoslX93JCoYKgD7sm",
    type: "textUpdater",
    position: {
      x: 108,
      y: 251.4375,
    },
    data: {
      text: "text message 1",
      source_id: "5EaqZoslX93JCoYKgD7d9",
      target_id: "5EaqZillX93JCjYKgD7z7",
    },
  },
  {
    id: "5EofZoslX93JCoYKgD788",
    type: "textUpdater",
    position: {
      x: 607,
      y: 89.4375,
    },
    data: {
      text: "text message 2",
      target_connected: true,
      source_id: "6EaqZoslX93JCoYKgD7d9",
      target_id: "6EaqZillX93JCjYKgD7z7",
    },
  },
];
const initialEdges = [
  {
    source: "5EofZoslX93JCoYKgD7sm",
    sourceHandle: "5EaqZoslX93JCoYKgD7d9",
    target: "5EofZoslX93JCoYKgD788",
    targetHandle: "6EaqZillX93JCjYKgD7z7",
    id: "reactflow__edge-5EofZoslX93JCoYKgD7sm5EaqZoslX93JCoYKgD7d9-5EofZoslX93JCoYKgD7886EaqZillX93JCjYKgD7z7",
  },
];

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const reactFlowWrapper = useRef();

  // This can be better controlled by using redux toolkit or any other state management library
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => {
      setEdges((eds) => addEdge(connection, eds));
      // I've passed an key **target_connected** into each node data for better control over save button
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === connection.target
            ? {
                ...node,
                data: { ...node.data, target_connected: true },
                selected: false,
              }
            : node
        )
      );
    },
    [setEdges]
  );

  const onDropFunc = (e) => {
    e.preventDefault();
    // fetching the data from dragging event initiated while dragging and dropping node from node panel
    let droppedNode = JSON.parse(e.dataTransfer.getData("new_node_data"));

    // decision on position of the dropping node element
    const position = reactFlowInstance.screenToFlowPosition({
      x: e.clientX - reactFlowWrapper.current.getBoundingClientRect().left,
      y: e.clientY - reactFlowWrapper.current.getBoundingClientRect().top,
    });
    const newNode = {
      ...droppedNode,
      position: position,
      data: {
        text: "",
        source_id: nanoid(),
        target_id: nanoid(),
        target_connected: false,
      },
    };
    setNodes((c) => [...c, newNode]);
  };

  // I'm passing the states as props for just this assignment but in real application a state management library will do much better.
  return (
    <ChakraProvider>
      <Flex
        sx={{
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          flexDir: "column",
        }}
      >
        <TopbarContainer nodes={nodes} />
        <Flex sx={{ width: "100%", height: "100%" }}>
          <Flex ref={reactFlowWrapper} sx={{ width: "100%", height: "100%" }}>
            <ReactFlow
              onInit={(inst) => {
                setReactFlowInstance(inst);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
              }}
              onNodeClick={(e, node) => {
                setSelectedNode(node);
              }}
              onPaneClick={(e) => selectedNode && setSelectedNode(null)}
              onDrop={onDropFunc}
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
            />
          </Flex>
          <PanelContainer
            setSelectedNode={setSelectedNode}
            selectedNode={selectedNode}
            setNodes={setNodes}
          />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
