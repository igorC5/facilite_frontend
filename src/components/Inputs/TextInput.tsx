import { Input } from "@chakra-ui/react";
import { forwardRef } from "react";

const TextInput = forwardRef<HTMLInputElement, any>(({ ...rest }, ref) => {
  return (
    <Input
      ref={ref}
      fontWeight="medium"
      rounded="xl"
      borderWidth={2}
      borderColor="teal.500"
      outline="none"
      _focus={{ borderColor: "blue.500" }}
      {...rest}
    />
  );
});

TextInput.displayName = "TextInput";

export default TextInput;