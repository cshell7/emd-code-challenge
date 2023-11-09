import { type SxProps, TextField } from "@mui/material";
import { get } from "lodash";
import { Controller, useFormContext } from "react-hook-form";

import type {
  Control,
  FieldPath,
  FieldPathValue,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

export function FormFieldInput<FormFields extends FieldValues>({
  name,
  label,
  placeholder = "",
  helperText,
  disabled,
  defaultValue,
  type = "text",
  onChange,
  control,
  rules,
  sx,
}: {
  name: FieldPath<FormFields>;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  disabled?: boolean;
  defaultValue: FieldPathValue<FormFields, FieldPath<FormFields>>;
  type?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  control: Control<FormFields>;
  rules?: Omit<
    RegisterOptions<FormFields>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  sx?: SxProps;
}) {
  const { formState } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <TextField
          sx={sx}
          disabled={formState.isSubmitting || disabled}
          name={field.name}
          onChange={(e) => {
            field.onChange(e);
            onChange?.(e);
          }}
          onBlur={field.onBlur}
          value={field.value || ""}
          error={!!get(formState.errors, field.name)}
          label={label}
          type={type}
          variant="outlined"
          placeholder={placeholder}
          helperText={
            get(formState.errors, field.name)
              ? (get(formState.errors, field.name)?.message as string)
              : helperText
          }
        />
      )}
    />
  );
}
