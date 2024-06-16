import React, { useState } from "react";
import { Box, Button, Input, InputBase, SvgIcon, styled } from "@mui/material";
import { TbBorderCornerRounded } from "react-icons/tb";
import { RxBorderWidth } from "react-icons/rx";
import { MuiColorInput } from "mui-color-input";
import { LuAlignHorizontalSpaceAround } from "react-icons/lu";
import { LuAlignVerticalSpaceAround } from "react-icons/lu";
import { VscTextSize } from "react-icons/vsc";
import { IoMdLink } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
const ButtonLikeLinkTextPlugin = ({ buttonProps, setButtonList }) => {
  const [href, setHref] = useState(false);
  const HiddenInput = styled(InputBase)(({ theme }) => ({
    display: "none",
  }));
  const [hrefValue, setHrefValue] = useState(buttonProps.href);
  const [editor] = useLexicalComposerContext();
  const handleChange = (property) => (event) => {
    let value;
    if (
      property == "borderColor" ||
      property == "textColor" ||
      property == "bodyColor"
    )
      value = event;
    else if (event.target.id == "href") {
      value = hrefValue;
      setHref(false);
    } else value = event.target.value;
    editor.dispatchCommand("UPDATE_BUTTON_PROPERTY", {
      id: buttonProps.id,
      property,
      value,
    });
  };
  return (
    <Box
      mt={4}
      id="toolbar"
      onClick={(e) => e.stopPropagation()}
      display={"flex"}
      width={"100%"}
      sx={{
        boxShadow: "0px 0px 5px 1px rgb(0,0,0,0.4)",
        borderRadius: "4px",
        p: href ? "8px 16px" : "0px",
        position: "absolute",
        top: "-110px",
        left: "0px",
        bgcolor: "#fff",
      }}
    >
      {!href ? (
        <>
          <Button sx={{ gap: "5px", p: "6px" }}>
            <SvgIcon fontSize="small">
              <TbBorderCornerRounded />
            </SvgIcon>
            <Input
              sx={{ width: "20px", textAlign: "center", fontSize: 14 }}
              value={buttonProps.borderRadius}
              onChange={handleChange("borderRadius")}
            />
          </Button>
          <Button sx={{ gap: "5px", p: "6px" }}>
            <SvgIcon fontSize="small">
              <RxBorderWidth />
            </SvgIcon>
            <Input
              sx={{ width: "20px", textAlign: "center", fontSize: 14 }}
              value={buttonProps.borderWidth}
              onChange={handleChange("borderWidth")}
            />
          </Button>
          <Button>
            <MuiColorInput
              InputProps={{
                inputComponent: HiddenInput,
              }}
              sx={{
                border: "none",
                "& .MuiInputBase-root": {
                  border: "none",
                },
                "& .MuiInputBase-root:hover": {
                  border: "none",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              input
              format="hex"
              value={buttonProps.borderColor}
              onChange={handleChange("borderColor")}
            />
          </Button>
          <Button sx={{ gap: "5px", p: "6px" }}>
            <SvgIcon>
              <LuAlignHorizontalSpaceAround />
            </SvgIcon>
            <Input
              sx={{ width: "20px", textAlign: "center", fontSize: 14 }}
              value={buttonProps.xPadding}
              onChange={handleChange("xPadding")}
            />
          </Button>
          <Button sx={{ gap: "5px", p: "6px" }}>
            <SvgIcon>
              <LuAlignVerticalSpaceAround />
            </SvgIcon>
            <Input
              sx={{ width: "20px", textAlign: "center", fontSize: 14 }}
              value={buttonProps.yPadding}
              onChange={handleChange("yPadding")}
            />
          </Button>
          <Button>
            <MuiColorInput
              InputProps={{
                inputComponent: HiddenInput,
              }}
              sx={{
                border: "none",
                "& .MuiInputBase-root": {
                  border: "none",
                },
                "& .MuiInputBase-root:hover": {
                  border: "none",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              input
              format="hex"
              value={buttonProps.bodyColor}
              onChange={handleChange("bodyColor")}
            />
          </Button>
          <Button sx={{ gap: "5px", p: "6px" }}>
            <SvgIcon>
              <VscTextSize />
            </SvgIcon>{" "}
            <Input
              sx={{ width: "20px", textAlign: "center", fontSize: 14 }}
              value={buttonProps.textSize}
              onChange={handleChange("textSize")}
            />
          </Button>
          <Button>
            <MuiColorInput
              InputProps={{
                inputComponent: HiddenInput,
              }}
              sx={{
                border: "none",
                "& .MuiInputBase-root": {
                  border: "none",
                },
                "& .MuiInputBase-root:hover": {
                  border: "none",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              input
              format="hex"
              value={buttonProps.textColor}
              onChange={handleChange("textColor")}
            />
          </Button>
          <Button onClick={() => setHref(true)}>
            <SvgIcon>
              <IoMdLink />
            </SvgIcon>
          </Button>
        </>
      ) : (
        <Box display={"flex"} gap={"10px"} width={"100%"}>
          <Input
            value={hrefValue}
            onChange={(e) => setHrefValue(e.target.value)}
            sx={{ width: "100%" }}
          />
          <Button id="href" onClick={handleChange("href")}>
            <SvgIcon id="href" onClick={handleChange("href")}>
              <FaCheck id="href" onClick={handleChange("href")} />
            </SvgIcon>
          </Button>
        </Box>
      )}{" "}
    </Box>
  );
};

export default ButtonLikeLinkTextPlugin;
