// src/theme/system.ts
import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    recipes: {
      table: {
        variants: {
          striped: {
            tbody: {
              tr: {
                "&:nth-of-type(odd)": {
                  td: {
                    bg: "{colors.red.100}",
                    _dark: {
                      bg: "{colors.blue.800}",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});