import { NativeSelectRoot, NativeSelectField } from "@chakra-ui/react";
import { forwardRef } from "react";

const SelectInput = forwardRef<HTMLSelectElement, any>((props, ref) => {
  return (
    <NativeSelectRoot>
      <NativeSelectField
        fontWeight="medium"
        rounded="xl"
        borderWidth={2}
        borderColor="teal.500"
        outline="none" 
        ref={ref} 
        {...props} 
      />
    </NativeSelectRoot>
  );
});

SelectInput.displayName = "SelectInput";
export default SelectInput;
