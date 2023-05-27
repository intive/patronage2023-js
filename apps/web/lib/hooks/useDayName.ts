import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useAtomValue } from "jotai";
import { languageAtom } from "store";
import { useTranslate } from "./useTranslate";

require("dayjs/locale/pl");
require("dayjs/locale/fr");
require("dayjs/locale/en-gb");

dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

export default function useDayName() {
  const locale = useAtomValue(languageAtom);
  const { t, dict } = useTranslate("Common");

  dayjs.locale(locale === "en" ? "en-gb" : locale);

  const getDayName = (timestamp: number) => {
    const date = dayjs(timestamp);
    const formattedDate = date.format("L");
    const dayName = date.format("dddd");

    if (date.isToday()) {
      return `${t(dict.days.today)}, ` + formattedDate;
    }

    if (date.isYesterday()) {
      return `${t(dict.days.yesterday)}, ` + formattedDate;
    }

    return `${dayName}, ${formattedDate}`;
  };

  return getDayName;
}
