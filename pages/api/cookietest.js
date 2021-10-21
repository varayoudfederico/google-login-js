import { serialize, CookieSerializeOptions } from "cookie";

export const setCookie = (res, name, value, options) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  // if ("maxAge" in options) {
  //   console.log("Max age");
  //   options.expires = new Date(Date.now() + options.maxAge);
  //   options.maxAge /= 1000;
  //   // options.domain = "/";
  //   // options.sameSite = "lax";
  //   // options.httpOnly = true;

  // }

  res.setHeader("Set-Cookie", serialize(name, stringValue, options));
};

export default function handler(req, res) {
  try {
    setCookie(
      res,
      "demo_token",
      "eyJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoiRmVkZXJpY28gVmFyYXlvdWQiLCJlbWFpbCI6InZhcmF5b3VkZmVkZXJpY29AZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdod1AtUW5sT2xiTDdOcU5HbWtfV3FRdnZISTVIa2hRMWFNdW1fUU5nPXM5Ni1jIiwic3ViIjoiMTA4NTk0NDI2NzIwMDg2OTMyOTE2IiwiaWF0IjoxNjM0ODI3NzU2LCJleHAiOjE2Mzc0MTk3NTZ9.V1qJGETQsAFP4cHQ9kkCJmnnqQlgjLyjcZBik7VrS4BwQJjVuTWJx4vlQm6H6nyViqjZt1BaNQ7lmkGHszUvbg",
      { path: "/" }
    );
    // res.end("Fede");
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
