import { isValidLuhn } from "./is-valid-luhn";

// Valid numbers grabbed from https://www.paypalobjects.com/en_AU/vhelp/paypalmanager_help/credit_card_numbers.htm
const testNumbers = [
  { input: "378282246310005", expected: true },
  { input: "371449635398431", expected: true },
  { input: "378734493671000", expected: true },
  { input: "5610591081018250", expected: true },
  { input: "30569309025904", expected: true },
  { input: 38520000023237, expected: true },
  { input: "6011-1111-1111-1117", expected: true },
  { input: "6011000990139424", expected: true },
  { input: "3530111333300000", expected: true },
  { input: "3566002020360505", expected: true },
  { input: "5555555555554444", expected: true },
  { input: "5105105105105100", expected: true },
  { input: "4111111111111111", expected: true },
  { input: "4012888888881881", expected: true },
  { input: "4222222222222", expected: true },
  { input: "1234567812345678", expected: false },
  { input: "4111111111111112", expected: false },
  { input: "1234 5678 9012 3456", expected: false },
  { input: "4444 3333 2222 1119", expected: false },
  { input: "5500 0000 0000 0005", expected: false },
  { input: "4111 1111 1111 1234", expected: false },
  { input: "asdf", expected: false },
  { input: "0", expected: true },
  { input: "1", expected: false },
  { input: "", expected: false },
];

describe("isValidLuhn", () => {
  test.each(testNumbers)(
    "should return $expected for input $input",
    ({ input, expected }) => {
      expect(isValidLuhn(input)).toBe(expected);
    }
  );
});
