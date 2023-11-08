import { TextField } from "@mui/material";
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
  control,
  defaultValue,
  className,
  rules,
  disabled,
  type = "text",
  helperText,
  onChange,
}: {
  name: FieldPath<FormFields>;
  label: string;
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
          placeholder=""
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
