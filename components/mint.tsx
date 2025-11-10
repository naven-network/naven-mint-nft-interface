"use client";

import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Web3Button } from "@/components/web3-button";
import { useMemo, useState } from "react";
import { usePublicClient, useWalletClient } from "wagmi";
import { decodeXPaymentResponse } from "@naven-os/x402/shared";
import { wrapFetchWithPayment } from "@naven-os/x402-fetch";
import { toast } from "sonner";

export const Mint = ({
  resource,
}: {
  resource: {
    name: string;
    desc: string;
    url: string;
    price: string;
    chainId: number;
  };
}) => {
  const [result, setResult] = useState("");
  const [log, setLog] = useState<unknown>();
  const [loading, setLoading] = useState(false);
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const fetchWithPayment = useMemo(() => {
    if (!walletClient || !publicClient) return;
    const combinedClient = Object.assign({}, publicClient, walletClient);
    return wrapFetchWithPayment(fetch, combinedClient);
  }, [walletClient, publicClient]);

  const onGet = async () => {
    setLog(undefined);
    setResult("");
    setLoading(true);
    const url = resource.url;
    if (!fetchWithPayment) return;
    fetchWithPayment(url, {
      method: "GET",
    })
      .then(async (response) => {
        const body = await response.json();
        console.log("body", JSON.stringify(body));

        response.headers.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });

        const res = response.headers.get("X-Payment-Response");
        console.log("res (base64)", res);
        if (res) {
          console.log("res (decoded)", atob(res));
        }

        const paymentResponse = decodeXPaymentResponse(
          response.headers.get("X-Payment-Response")!,
        );
        console.log(paymentResponse);
        setLog(paymentResponse);
        setResult(body);
        toast.success("Fetch successful");
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <div key={resource.name} className={"bg-card rounded-xl p-4 border "}>
        <div className="flex items-center gap-2 mb-2">
          <Badge>Get</Badge>
          <Typography className={"font-medium"}>{resource.name}</Typography>
        </div>
        <Typography className={"text-foreground/60 text-sm mb-6"}>
          {resource.desc}
        </Typography>
        <Web3Button
          targetChainId={resource?.chainId}
          loading={loading}
          onClick={onGet}
        >
          Fetch {resource.price}
        </Web3Button>
        <div className="py-3" />
        {result && (
          <>
            <pre className={"bg-background p-3 rounded-lg text-xs"}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </>
        )}
        {!!log && (
          <pre className={"bg-background p-3 rounded-lg text-xs mt-4"}>
            {JSON.stringify(log, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};
