import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

import "dayjs/locale/uk";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale("uk");

export const lastSee = (iso?: string | null) => {
  if (!iso) return "невідомо";
  const date = dayjs(iso);
  return date.fromNow();
};
