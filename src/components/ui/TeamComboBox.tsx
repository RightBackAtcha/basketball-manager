import {
    ComboBox,
    ComboBoxProps,
    Label,
    ValidationResult,
    Input,
    Button,
    FieldError,
    Popover, ListBox
} from "react-aria-components";
import React from "react";

interface TeamComboBoxProps<T extends object>
    extends Omit<ComboBoxProps<T>, 'children'> {
    label?: string;
    description?: string | null;
    errorMessage?: string | ((validation: ValidationResult) => string);
    children: React.ReactNode | ((item: T) => React.ReactNode);
}

export default function TeamComboBox<T extends object> (
    { label, description, errorMessage, children, ...props }: TeamComboBoxProps<T>
) {
    return (
      <ComboBox {...props}>
          <Label>{label}</Label>
          <div>
              <Input />
              <Button>▼</Button>
          </div>
          <FieldError>{errorMessage}</FieldError>
          <Popover>
              <ListBox>
                  {children}
              </ListBox>
          </Popover>
      </ComboBox>
    );
}