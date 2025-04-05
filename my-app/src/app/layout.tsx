// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }


// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import { ThemeProvider } from '@/providers/ThemeProvider';
// import { AuthProvider } from '@/context/AuthContext';
// import { Header } from '@/components/common/Header';
// import { SessionProvider } from 'next-auth/react';
// import { Footer } from '@/components/common/Footer';
// import './globals.css';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Real Estate App',
//   description: 'Find your dream property',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
        
//         <AuthProvider>
//           <ThemeProvider>
//             <div className="min-h-screen flex flex-col">
//               <Header />
//               <main className="flex-grow">
//                 {children}
//               </main>
//               <Footer />
//             </div>
//           </ThemeProvider>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }


// import type { Metadata } from 'next';
// import { Inter } from 'next/font';
// import { ThemeProvider } from '@/providers/ThemeProvider';
// import { AuthProvider } from '@/context/AuthContext';
// import { Header } from '@/components/common/Header';
// import { SessionProvider } from 'next-auth/react';
// import { Footer } from '@/components/common/Footer';
// import './globals.css';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Real Estate App',
//   description: 'Find your dream property',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <SessionProvider>
//           <AuthProvider>
//             <ThemeProvider>
//               <div className="min-h-screen flex flex-col">
//                 <Header />
//                 <main className="flex-grow">
//                   {children}
//                 </main>
//                 <Footer />
//               </div>
//             </ThemeProvider>
//           </AuthProvider>
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }


// // layout.tsx
// 'use client'; // This marks the component as a Client Component

// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google'; // Ensure you are importing correctly
// import { ThemeProvider } from '@/providers/ThemeProvider';
// import { AuthProvider } from '@/context/AuthContext';
// import { Header } from '@/components/common/Header';
// import { SessionProvider } from 'next-auth/react';
// import { Footer } from '@/components/common/Footer';
// import './globals.css';

// // Inter font
// const inter = Inter({ subsets: ['latin'] });

// // Metadata for the page
// // export const metadata: Metadata = {
// //   title: 'Real Estate App',
// //   description: 'Find your dream property',
// // };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         {/* Wrap everything in Client-Side Providers */}
//         <SessionProvider>
//           <AuthProvider>
//             <ThemeProvider>
//               <div className="min-h-screen flex flex-col">
//                 <Header />
//                 <main className="flex-grow">
//                   {children}
//                 </main>
//                 <Footer />
//               </div>
//             </ThemeProvider>
//           </AuthProvider>
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }





// 'use client'; // Ensure this is a client component

// import { Inter } from 'next/font/google'; // Import Inter font
// import { ThemeProvider } from '@/providers/ThemeProvider'; // Ensure correct import path
// import { AuthProvider } from '@/context/AuthContext';
// import { Header } from '@/components/common/Header';
// import { Footer } from '@/components/common/Footer';
// import { SessionProvider } from 'next-auth/react';
// import { Metadata } from 'next'; // Import Metadata type
// import './globals.css';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Real Estate App',
//   description: 'Find your dream property',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <SessionProvider>
//           <AuthProvider>
//             <ThemeProvider> {/* Ensure ThemeProvider wraps the entire tree */}
//               <div className="min-h-screen flex flex-col">
//                 <Header />
//                 <main className="flex-grow">{children}</main>
//                 <Footer />
//               </div>
//             </ThemeProvider>
//           </AuthProvider>
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }



// 'use client';

// import { useEffect } from 'react';
// import { Inter } from 'next/font/google';
// import { ThemeProvider } from '@/providers/ThemeProvider';
// import { AuthProvider } from '@/context/AuthContext';
// import { Header } from '@/components/common/Header';
// import { Footer } from '@/components/common/Footer';
// import { SessionProvider } from 'next-auth/react';
// import './globals.css';

// const inter = Inter({ subsets: ['latin'] });

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   useEffect(() => {
//     document.title = 'Real Estate App';
//     document
//       .querySelector('meta[name="description"]')
//       ?.setAttribute('content', 'Find your dream property');
//   }, []);

//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider> {/* ✅ Move ThemeProvider to the top */}
//           <SessionProvider>
//             <AuthProvider>
//               <div className="min-h-screen flex flex-col">
//                 <Header /> {/* Now Header has access to useTheme() */}
//                 <main className="flex-grow">{children}</main>
//                 <Footer />
//               </div>
//             </AuthProvider>
//           </SessionProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }



// 'use client';

// import { Inter } from 'next/font/google';
// import { ThemeProvider } from '@/providers/ThemeProvider';
// import { AuthProvider } from '@/context/AuthContext';
// import { Header } from '@/components/common/Header';
// import { Footer } from '@/components/common/Footer';
// import { SessionProvider } from 'next-auth/react';
// import './globals.css';
// import Head from 'next/head';
// import { useEffect } from 'react';

// const inter = Inter({ subsets: ['latin'] });

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   // Client-side only operations
//   useEffect(() => {
//     document.title = 'Real Estate App';
//     const metaDesc = document.querySelector('meta[name="description"]');
//     if (metaDesc) {
//       metaDesc.setAttribute('content', 'Find your dream property');
//     }
//   }, []);

//   return (
//     <html lang="en" suppressHydrationWarning>
//       <Head>
//         <title>Real Estate App</title>
//         <meta name="description" content="Find your dream property" />
//       </Head>
//       <body className={inter.className}>
//         <SessionProvider>
//           <AuthProvider>
//             <ThemeProvider>
//               <div className="min-h-screen flex flex-col">
//                 <Header />
//                 <main className="flex-grow">
//                   {children}
//                 </main>
//                 <Footer />
//               </div>
//             </ThemeProvider>
//           </AuthProvider>
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }



// 'use client';

// import { Inter } from 'next/font/google';
// import { ThemeProvider } from '@/providers/ThemeProvider';
// import { AuthProvider } from '@/context/AuthContext';
// import { Header } from '@/components/common/Header';
// import { Footer } from '@/components/common/Footer';
// import { SessionProvider } from 'next-auth/react';
// import './globals.css';
// import Head from 'next/head';

// const inter = Inter({ subsets: ['latin'] });

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="font-sans">
//         <Head>
//           <title>Real Estate App</title>
//           <meta name="description" content="Find your dream property" />
//         </Head>
//         <SessionProvider>
//           <AuthProvider>
//             <ThemeProvider>
//               <div className="min-h-screen flex flex-col">
//                 <Header />
//                 <main className="flex-grow">{children}</main>
//                 <Footer />
//               </div>
//             </ThemeProvider>
//           </AuthProvider>
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }



'use client';

import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext'; // Fixed Import
import { AuthProvider } from '@/context/AuthContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { SessionProvider } from 'next-auth/react';
import './globals.css';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Head>
          <title>Real Estate App</title>
          <meta name="description" content="Find your dream property" />
        </Head>
        <SessionProvider>
          <AuthProvider>
            <ThemeProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
            </ThemeProvider>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
