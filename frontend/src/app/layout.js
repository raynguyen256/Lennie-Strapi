import { Plus_Jakarta_Sans, Spectral } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "Lennie SkinLab",
  description:
    "Lennie SkinLab — chăm sóc và phục hồi làn da theo triết lý cá nhân hóa.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="vi"
      className={`${plusJakartaSans.variable} ${spectral.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-ink">
        {children}
      </body>
    </html>
  );
}
