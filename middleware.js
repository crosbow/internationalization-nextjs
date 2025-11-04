import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";

const defaultLocale = "en";

const locales = ["en", "bn"];

const getLocale = (request) => {
  // Get preferred language
  const headers = request.headers.get("accept-language") ?? null;
  //   let headers = { "accept-language": "en-US,en;q=0.5" };  <- Nextjs example

  console.log(headers); // en-US,en;q=0.9,bn;q=0.8

  const languages = new Negotiator({ headers }).languages();

  console.log(languages, "---and---", "en-US,en;q=0.5"); // [ '*' ] '---and---' 'en-US,en;q=0.5'
  //   console.log(languages);

  return match(languages, locales, defaultLocale);
};

export default function middleware(request) {
  // Get the pathname from request Url
  const pathname = request.nextUrl.pathname;

  //   console.log(pathname);

  // check is locale missing in path
  const isLocaleMissingInPathname = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}`) || !pathname.startsWith(`/${locale}/`)
  );

  if (isLocaleMissingInPathname) {
    // Detect the user preferred pathname locale  and redirect with a locale
    const locale = getLocale(request);
    console.log({ locale });

    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
