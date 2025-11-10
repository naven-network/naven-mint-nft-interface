import { useAccount, useSwitchChain } from "wagmi";
import { Button } from "@/components/ui/button";
import { MouseEvent, ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Spinner } from "./ui/spinner";

interface Web3ButtonProps {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  targetChainId: number;
  onSwitchNetwork?: () => Promise<void>;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
  variant?: "destructive" | "default" | "secondary";
  type?: "reset" | "button" | "submit";
  onWalletConnect?: () => void;
  onNetworkSwitch?: () => void;
}

export const Web3Button = ({
  children,
  className = "",
  disabled = false,
  loading = false,
  targetChainId,
  onSwitchNetwork,
  onClick,
  variant = "default",
  type = "button",
  onWalletConnect,
  onNetworkSwitch,
  ...props
}: Web3ButtonProps) => {
  const { login, isConnected, isAuthenticated } = useAuth();
  const { chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const isWrongNetwork = isConnected && chainId !== targetChainId;

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    const shouldAllowSubmit =
      type === "submit" && isAuthenticated && !isWrongNetwork;

    if (!shouldAllowSubmit) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!isAuthenticated) {
      e.preventDefault();
      e.stopPropagation();
      login();
      onWalletConnect?.();
      return;
    }

    if (isWrongNetwork) {
      e.preventDefault();
      e.stopPropagation();
      if (onSwitchNetwork) {
        await onSwitchNetwork();
      } else if (switchChain) {
        switchChain({ chainId: targetChainId });
      }
      onNetworkSwitch?.();
      return;
    }

    if (onClick) {
      await onClick(e);
    }
  };

  const getButtonText = () => {
    if (!isAuthenticated) return "Connect Wallet";
    if (isWrongNetwork) return "Switch Network";
    return children;
  };

  const isDisabled = !isWrongNetwork && (disabled || loading);

  return (
    <Button
      disabled={isDisabled}
      onClick={handleClick}
      className={className}
      variant={variant}
      type={type}
      {...props}
    >
      {loading && <Spinner />}
      {getButtonText()}
    </Button>
  );
};
