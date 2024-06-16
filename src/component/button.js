import React from "react";
import { Button, Box, TextField } from "@mui/material";
import ButtonLikeLinkTextPlugin from "./toolbar";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const CustomizableButton = ({ buttonProps, setButtonList }) => {
  const [editor] = useLexicalComposerContext();
  const handleChange = (property) => (event) => {
    const value = event.target.value;
    editor.dispatchCommand("UPDATE_BUTTON_PROPERTY", {
      id: buttonProps.id,
      property,
      value,
    });
  };
  return (
    <Box
      width={1 / 2}
      id="button_box"
      sx={{ position: "relative", display: "flex" }}
    >
      {" "}
      <Box display="flex">
        <Button
          id="button"
          onClick={(e) => {
            e.stopPropagation();
            setButtonList((prevList) =>
              prevList.map((button) =>
                button.id === buttonProps.id
                  ? { ...button, isToolbarVisible: true }
                  : { ...button, isToolbarVisible: false }
              )
            );
          }}
          href={buttonProps.href}
          variant="contained"
          sx={{
            // minWidth: "",
            transition: "width 0.3s ease-in-out",
            whiteSpace: "nowrap",
            "&:hover": {
              color: buttonProps.textColor,
              backgroundColor: buttonProps.bodyColor,
            },
            textTransform: "none",
            borderRadius: `${
              buttonProps.borderRadius ? buttonProps.borderRadius : 0
            }px`,
            borderWidth: `${buttonProps.borderWidth}px`,
            borderColor: buttonProps.borderColor,
            padding: `${buttonProps.yPadding}px ${buttonProps.xPadding}px`,
            backgroundColor: buttonProps.bodyColor,
            fontSize: `${buttonProps.textSize}px`,
            color: buttonProps.textColor,
            borderStyle: "solid",
          }}
          aria-label={buttonProps.altText}
        >
          <TextField
            variant="standard"
            fullWidth
            InputProps={{
              style: {
                color: buttonProps.textColor,
                fontSize: `${buttonProps.textSize}px`,
                width: "100%",
              },
            }}
            sx={{
              fontSize: `${buttonProps.textSize}px`,
              transition: "width 0.3s ease-in-out",
              whiteSpace: "nowrap",
              "& .MuiInput-underline:before": {
                borderBottom: "none",
              },
              "& .MuiInput-underline:hover:before": {
                borderBottom: "none",
              },
              "& .MuiInput-underline:after": {
                borderBottom: "none",
              },
            }}
            value={buttonProps.buttonText}
            onChange={handleChange("buttonText")}
          />
        </Button>{" "}
      </Box>
      {buttonProps.isToolbarVisible && (
        <ButtonLikeLinkTextPlugin
          buttonProps={buttonProps}
          setButtonList={setButtonList}
        />
      )}
    </Box>
  );
};

export default CustomizableButton;
