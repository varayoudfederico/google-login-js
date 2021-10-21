import { serialize, CookieSerializeOptions } from "cookie";

export const setCookie = (res, name, value, options) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  //   if ("maxAge" in options) {
  //     options.expires = new Date(Date.now() + options.maxAge);
  //     options.maxAge /= 1000;
  //   }

  res.setHeader("Set-Cookie", serialize(name, stringValue, options));
};

export default function handler(req, res) {
  try {
    setCookie(res, "Next.js", "api-middleware!");
    res.end(res.getHeader("Set-Cookie"));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
