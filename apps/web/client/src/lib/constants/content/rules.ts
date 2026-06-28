/* rules to validate when user entering input */
export const PasswordRules = [
  { message: "Password length atleast 6", test: (p: string) => p.length > 5 },
  {
    message: "Password has lowercase letter",
    test: (p: string) => /[a-z]/.test(p),
  },
  {
    message: "Password has uppercase letter",
    test: (p: string) => /[A-Z]/.test(p),
  },
  {
    message: "Password has one number",
    test: (p: string) => /[0-9]/.test(p),
  },
  {
    message: "One special character",
    test: (p: string) => /[&%$#@!]/.test(p),
  },
];

export const NameRules = [
  {
    message: "Name length atleast 4",
    test: (p: string) => p.length > 3,
  },
];
