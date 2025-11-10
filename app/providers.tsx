"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/footer";
import { WagmiProvider } from "wagmi";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { wagmiConfig } from "@/lib/wagmi";

export const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <RainbowKitProvider theme={darkTheme()}>
          <Toaster
            position={"bottom-right"}
            theme={"dark"}
            closeButton={true}
          />
          <div
            className={cn({
              "pt-26 pb-20": true,
            })}
          >
            <Header />
            <div>{children}</div>
            <Toaster />
            <Footer />
          </div>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
};
