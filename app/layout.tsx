import { Inter } from "next/font/google";
import "./globals.css";
import React, { useMemo } from "react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { Toaster } from "react-hot-toast";

const ReactUIWalletModalProviderDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletModalProvider,
  { ssr: false }
);

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const endpoint = "https://api.devnet.solana.com"; // Replace with your preferred RPC endpoint

  return (
    <html lang="en">
      <body className={inter.className}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets}>
            <ReactUIWalletModalProviderDynamic>
              <Toaster position="bottom-right" reverseOrder={false} />
              {children}
            </ReactUIWalletModalProviderDynamic>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
