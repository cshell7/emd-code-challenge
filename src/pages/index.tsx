import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { FormFieldInput } from "~/components/form-field-input";
import { api } from "~/utils/api";
import {
  AddCircleOutlineOutlined as AddCircleOutlineOutlinedIcon,
  RemoveCircleOutlineOutlined as RemoveCircleOutlineOutlinedIcon,
  CheckOutlined as CheckOutlinedIcon,
  PriorityHighOutlined as PriorityHighOutlinedIcon,
} from "@mui/icons-material";

interface FormFields {
  creditCardNumbers: { value: string }[];
}
const defaultValues: FormFields = {
  creditCardNumbers: [{ value: "" }],
};

export default function Home() {
  const { mutateAsync: testMany, data } =
    api.creditCard.checkManyCreditCardNumbers.useMutation();
  // TODO: think of a better way to handle when state is changes since submitting form.
  const [isDirty, setIsDirty] = useState(true);

  const useFormMethods = useForm<FormFields>({
    defaultValues,
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useFormMethods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "creditCardNumbers",
  });

  const onSubmit = async (values: FormFields) => {
    await testMany(
      {
        creditCardNumbers: values.creditCardNumbers.map(({ value }) => value),
      },
      {
        onSuccess: () => {
          setIsDirty(false);
          reset(undefined, { keepValues: true, keepTouched: false });
        },
        onError: () => {
          reset(undefined, { keepValues: true });
        },
      }
    );
  };
  return (
    <>
      <Head>
        <title>Credit Card Number Validator</title>
        <meta name="description" content="Credit Card Number Validator" />
      </Head>
      <Container maxWidth="xs" component="main">
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" color="inherit" component="div">
              Credit Card Number Checker
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Box sx={{ paddingTop: "40px" }}>
          <Card>
            <FormProvider {...useFormMethods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader title="Super Official Credit Card Validator" />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <Typography>
                    Hello, please input your credit card number(s) so I can tell
                    if they are potentially valid.
                  </Typography>
                  <Typography>
                    Don{`'`}t worry, you can probably trust me. I do all the
                    checking on my super secure server and don{`'`}t secretly
                    steal your credit card numbers so I can go buy more snacks
                    and caffeine (I really don{`'`}t).
                  </Typography>
                  <Typography variant="h6">
                    Credit Card Numbers to check:
                  </Typography>
                  {fields.map((item, index) => (
                    <Box
                      key={item.id}
                      sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                    >
                      <IconButton
                        type="button"
                        onClick={() => remove(index)}
                        disabled={index === 0}
                        sx={{ opacity: index === 0 ? 0 : 1 }}
                      >
                        <RemoveCircleOutlineOutlinedIcon />
                      </IconButton>
                      {/* TODO: look into better handling of strings/masking of format */}
                      <FormFieldInput
                        sx={{ flexGrow: 1 }}
                        disabled={isSubmitting}
                        control={control}
                        name={`creditCardNumbers.${index}.value`}
                        placeholder="Credit Card Number"
                        defaultValue={item.value}
                        onChange={() => {
                          setIsDirty(true);
                        }}
                        // TODO: fix validation from immediately firing on new value after submitting form.
                        rules={{
                          required: "Required",
                          validate: (value) => {
                            const cleanedValue = (value as string).replace(
                              /\D/g,
                              ""
                            );
                            if (cleanedValue.length < 12) {
                              return "Number must be at least 12 digits long";
                            }
                            if (cleanedValue.length > 19) {
                              return "Number must be less than 19 digits long";
                            }
                            return true;
                          },
                        }}
                      />
                      <Box sx={{ width: "20px" }}>
                        {!isDirty &&
                          !!data &&
                          (data.results[index]?.isValid ? (
                            <CheckOutlinedIcon color="success" />
                          ) : (
                            <PriorityHighOutlinedIcon color="error" />
                          ))}
                      </Box>
                    </Box>
                  ))}
                  <IconButton
                    type="button"
                    onClick={() => {
                      append({ value: "" });
                      setIsDirty(true);
                    }}
                    sx={{ alignSelf: "flex-start" }}
                  >
                    <AddCircleOutlineOutlinedIcon />
                  </IconButton>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Button
                    type="button"
                    onClick={() => {
                      setIsDirty(true);
                      reset();
                    }}
                  >
                    Reset
                  </Button>
                  <Button variant="contained" type="submit">
                    Check
                  </Button>
                </CardActions>
              </form>
            </FormProvider>
          </Card>
        </Box>
      </Container>
    </>
  );
}
