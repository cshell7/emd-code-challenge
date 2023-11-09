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
  control,
  defaultValue,
  className,
  rules,
  disabled,
  type = "text",
  helperText,
  onChange,
  sx,
}: {
  name: FieldPath<FormFields>;
  label?: string;
  placeholder?: string;
  control: Control<FormFields>;
  defaultValue: FieldPathValue<FormFields, FieldPath<FormFields>>;
  className?: string;
  rules?: Omit<
    RegisterOptions<FormFields>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  disabled?: boolean;
  type?: string;
  helperText?: React.ReactNode;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
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
          className={className}
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
