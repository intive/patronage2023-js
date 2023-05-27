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

export default function useLocaleDateString() {
  const locale = useAtomValue(languageAtom);
  const { t, dict } = useTranslate("Common");

  dayjs.locale(locale === "en" ? "en-gb" : locale);

  const getDayName = (date: dayjs.Dayjs) => {
    if (date.isToday()) {
      return t(dict.days.today);
    }

    if (date.isYesterday()) {
      return t(dict.days.yesterday);
    }

    const dayName = date.format("dddd");

    return dayName;
  };

  const getDateString = (timestamp: number) => {
    const date = dayjs(timestamp);
    const formattedDate = date.format("L");

    return `${getDayName(date)}, ${formattedDate}`;
  };

  return getDateString;
}
