export const ExtendedText = {
  baseStyle: {
    fontWeight: "plain", // Normally, it is "semibold"
  },
  sizes: {
    xl: {
      h: "60px",
      fontSize: "lg",
      px: "32px",
    },
  },
  variants: {
    "with-shadow": {
      bg: "red.400",
      boxShadow: "0 0 2px 2px #efdfde",
    },

    navText: {
      color: "#212121",

      _hover: {
        color: "#9BA4B5",
        textDecoration: "underline",
      },
    },
    navTextSelected: {
      color: "#9BA4B5",
    },

    sm: {
      //   bg: 'teal.500',
      fontSize: "md",
    },
  },
  defaultProps: {
    size: "md", // default is md
    variant: "sm", // default is solid
    colorScheme: "green", // default is gray
  },
};
