import {styled} from "@mui/material";

const Div = styled("div", {
  name: "MuiDiv",
  overridesResolver: (props, styles) => {
    return [styles.root];
  }
})({});

export default Div;