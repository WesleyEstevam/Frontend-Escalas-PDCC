// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    primary: "#ec3c21",
    secondary: "#ffffd7",
  },
};

export const theme = extendTheme({ colors });
