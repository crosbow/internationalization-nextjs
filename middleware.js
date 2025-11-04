import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";

const defaultLocale = "en";

const locales = ["en", "bn"];

function getLocale(request) {
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  const headers = { "accept-language": acceptedLanguage };
  const languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale); // en or bn
}

export default function middleware(request) {
  // Get the pathname from request Url
  const pathname = request.nextUrl.pathname;

  //   console.log(pathname);

  // check is locale missing in path
  const isLocaleMissingInPathname = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}`) && !pathname.startsWith(`/${locale}/`)
  );

  if (isLocaleMissingInPathname) {
    // Detect the user preferred pathname locale  and redirect with a locale
    const locale = getLocale(request);
    console.log({ locale, pathname });

    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
