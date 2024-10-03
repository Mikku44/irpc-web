import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from 'next/head';
import Navbar from "./components/Navbar";
import { Inter,Noto_Sans_Thai } from 'next/font/google'
import Footer from "./components/Footer";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({ subsets: ['latin'] })

const noto = Noto_Sans_Thai({ subsets: ['latin'], 
   display: 'swap',
   variable: '--font-noto',
   })



export const metadata: Metadata = {
  title: "IRPC - บริษัท ไออาร์พีซี จำกัด",
  description: "ไออาร์พีซี มุ่งมั่นในการพัฒนาผลิตภัณฑ์และกระบวนการผลิตเชิงนวัตกรรมที่เป็นมิตรต่อสิ่งแวดล้อม ตลอดจนการพัฒนาคุณภาพของผลิตภัณฑ์",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={` ${noto.variable} antialiased`}
      >
        <Navbar />
        {children}
    
      </body>
    </html>
  );
}
