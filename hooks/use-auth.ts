"use client";

import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export const useAuth = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  const login = () => openConnectModal?.();
  const logout = () => disconnect();

  return {
    isAuthenticated: address,
    isConnected,
    address,
    login,
    logout,
  };
};
