import type { Metadata } from "next";
import SessionProvider from "@/app/providers/SessionProvider";
import { getServerSession } from "next-auth";
import "./globals.css";
import localfont from "next/font/local";

const montrealMedium = localfont({
  src: "../public/fonts/NeueMontreal-Medium.otf",
  variable: "--montrealMedium",
  display: "swap",
});

const montrealRegular = localfont({
  src: "../public/fonts/NeueMontreal-Regular.otf",
  variable: "--montrealRegular",
  display: "swap",
});

const montrealBold = localfont({
  src: "../public/fonts/NeueMontreal-Bold.otf",
  variable: "--montrealBold",
  display: "swap",
});

const montrealLight = localfont({
  src: "../public/fonts/NeueMontreal-Light.otf",
  variable: "--montrealLight",
  display: "swap",
});
export const metadata: Metadata = {
  title: "GrowthBonsai",
  description: "Track your achievements and grow your skills with GrowthBonsai",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en" data-theme="lemonade">
      <body>
        <SessionProvider session={session}>
          <main
            className={`${montrealBold.variable} ${montrealMedium.variable} ${montrealRegular.variable}  ${montrealLight.variable} font-sans`}
          >
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
