import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import CustomizableButton from "./component/button.js";
import { nanoid } from "nanoid";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext.js";

const Flex = styled(Box)`
  display: flex;
`;

const editorConfig = {
  onError(error) {
    throw error;
  },
};

const defaultButton = {
  id: nanoid(),
  isToolbarVisible: false,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: "#000",
  xPadding: 16,
  yPadding: 8,
  bodyColor: "#1976d2",
  textSize: 16,
  textColor: "#fff",
  href: "#",
  buttonText: "Add your button text",
};

export const App = () => {
  const [buttonList, setButtonList] = useState([defaultButton]);
  console.log("ButtonList: ", buttonList);
  const checkToolbarVisibility = (e) => {
    if (e.target.id != "button" || e.target.id != "toolbar") {
      setButtonList((list) =>
        list.map((button) => ({ ...button, isToolbarVisible: false }))
      );
    }
  };
  return (
    <Flex
      sx={{
        width: "100%",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Flex
        sx={{
          alignItems: "flex-start",
          justifyContent: "space-between",
          bgcolor: "#f0f3f4",
          p: "20px 40px",
          borderBottom: "2px solid #666666",
          fontSize: 24,
        }}
      >
        <Flex flexDirection={"column"} gap={"20px"} fontWeight={800}>
          Lexical Editor Plugin Assignment
          <Button
            sx={{
              textTransform: "none",
              p: "10px 30px",
              color: "#fff",
              fontSize: 16,
              fontWeight: 500,
              bgcolor: "rgb(0,0,0,0.7)",
              "&:hover": {
                color: "#fff",
                bgcolor: "#000",
              },
            }}
            onClick={() => {
              setButtonList((c) => [...c, { ...defaultButton, id: nanoid() }]);
            }}
          >
            Add Button
          </Button>
        </Flex>
        <Flex
          gap={"10px"}
          width={"400px"}
          sx={{ fontWeight: 700, fontSize: 16, flexDirection: "column" }}
        >
          Instructions:
          <Flex fontSize={"14px"} fontWeight={400}>
            1. Plugin is defined in component folder <br />
            2. useLexicalComposerContext hook is used to update/read. <br />
            3. You can add N number of buttons. <br />
            4. Styling has not been carried out with perfection.
          </Flex>
        </Flex>
      </Flex>
      <Flex
        onClick={(e) => checkToolbarVisibility(e)}
        sx={{
          flexDirection: "column",
          gap: "50px",
          p: "80px 40px",
          flexWrap: "wrap",
        }}
      >
        <LexicalComposer initialConfig={editorConfig}>
          {buttonList.map((buttonProps, index) => {
            return (
              <CustomizableButton
                key={index}
                buttonProps={buttonProps}
                setButtonList={setButtonList}
              />
            );
          })}
          <CustomButtonCommandsPlugin setButtonList={setButtonList} />
        </LexicalComposer>
      </Flex>
    </Flex>
  );
};

export default App;

const CustomButtonCommandsPlugin = ({ setButtonList }) => {
  const [editor] = useLexicalComposerContext();

  const priority = 1;
  useEffect(() => {
    return editor.registerCommand(
      "UPDATE_BUTTON_PROPERTY",
      (payload) => {
        const { id, property, value } = payload;
        setButtonList((prevList) =>
          prevList.map((button) =>
            button.id === id ? { ...button, [property]: value } : button
          )
        );
        return true;
      },
      priority
    );
  }, [editor, setButtonList]);

  return null;
};
