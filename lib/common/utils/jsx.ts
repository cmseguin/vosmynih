type ClassNameArg =
  | string
  | Record<string, boolean | undefined | null>
  | undefined
  | null
  | false;
type ValidClassnameArg = ClassNameArg | ClassNameArg[];

export const className = (...inputs: ValidClassnameArg[]) => {
  const classes: string[] = [];

  inputs.forEach((input) => {
    if (Array.isArray(input)) {
      classes.push(className(...input));
    } else if (typeof input === "string") {
      classes.push(input);
    } else if (typeof input === "object" && input !== null) {
      Object.keys(input).forEach((key) => {
        if (input[key]) {
          classes.push(key);
        }
      });
    }
  });

  return classes.join(" ");
};

export const cn = className;
