import { http } from "viem";
import { createConfig } from "@wagmi/core";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  metaMaskWallet,
  okxWallet,
  rabbyWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { xLayer } from "viem/chains";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        injectedWallet,
        okxWallet,
        rabbyWallet,
        metaMaskWallet,
        walletConnectWallet,
      ],
    },
  ],
  {
    appName: "Naven",
    projectId: "91db1413f4a9579928eb28f804d2a063",
  },
);

export const wagmiConfig = createConfig({
  chains: [xLayer],
  transports: {
    [xLayer.id]: http(),
  },
  ssr: true,
  connectors,
});
