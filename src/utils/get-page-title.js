import defaultSettings from "@/settings";

const title = defaultSettings.title || "çŠćé­ç";

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
