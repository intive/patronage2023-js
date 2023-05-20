import dictionary from "./apps/web/lib/dictionary";
import clc from "cli-color";
interface Dictionary {
  [key: string]: DictionaryValue;
}

interface DictionaryValue {
  [key: string]: DictionaryValue | string;
}

interface retVal {
  trace: string[];
  missing: string[];
}

const hasMissingProperties = (obj: DictionaryValue): string[] =>
  ["en", "pl", "fr"].filter((key) => !(key in obj));

const hasChildren = (obj: DictionaryValue): boolean => {
  return Object.values(obj).some((value) => typeof value === "object");
};

const checkDict = (obj: Dictionary, trace: string[] = []): retVal[] =>
  Object.entries(obj).reduce((acc: retVal[], [key, value]) => {
    const currentTrace = [...trace, key];

    if (hasChildren(value as DictionaryValue)) {
      return acc.concat(checkDict(value as Dictionary, currentTrace));
    }

    const missingProperties = hasMissingProperties(value as DictionaryValue);
    if (missingProperties.length > 0) {
      return acc.concat({ trace: currentTrace, missing: missingProperties });
    }

    return acc;
  }, []);

const validate = () => {
  console.log("Checking dictionary...");
  const res = checkDict(dictionary);

  if (res.length) {
    const errorMsg =
      `${`The following ${
        res.length > 1 ? `${clc.yellow("keys")} are` : `${clc.yellow("key")} is`
      } causing build to fail ❌`}` +
      `\n\n${res
        .map(
          (parent) =>
            `• ${parent.trace.map((val, idx) =>
              idx === parent.trace.length - 1
                ? clc.yellow(val)
                : `${clc.blueBright(val)} => `
            )} is ${clc.red.underline("missing")} [${parent.missing.join(
              " "
            )}] ${parent.missing.length > 1 ? "keys" : "key"} \n`
        )
        .join("")}`.replaceAll(",", "");

    throw new Error(errorMsg);
  } else {
    console.log(`${clc.greenBright("All clear")} ✅`);
  }
};

validate();
