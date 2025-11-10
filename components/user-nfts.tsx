"use client";

import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { Address, erc721Abi } from "viem";
import { contracts } from "@/config/config";
import { Typography } from "@/components/ui/typography";
import { collectionAbi } from "@/config/abi/collection";
import Image from "next/image";
import { handleImageUri } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

interface NFTMetadata {
  name?: string;
  description?: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export const UserNFTs = () => {
  const [nftMetadata, setNftMetadata] = useState<NFTMetadata[]>([]);
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);

  const { data: balance, error } = useReadContract({
    abi: erc721Abi,
    address: contracts.Collection,
    functionName: "balanceOf",
    args: [address as Address],
  });
  const balances = useMemo(
    () => [...Array(Number(balance ?? "0")).keys()],
    [balance],
  );
  console.log(balance, error, balances);

  const { data } = useReadContracts({
    contracts: balances?.map((n) => ({
      abi: collectionAbi,
      address: contracts.Collection,
      functionName: "tokenOfOwnerByIndex",
      args: [address as Address, n],
    })),
  });
  console.log(data);

  const tokenIds = useMemo(
    () => data?.map((item) => item.result as bigint).filter((i) => i > 0n),
    [data],
  );

  const { data: tokenUriResults } = useReadContracts({
    contracts: tokenIds?.map((id) => ({
      abi: collectionAbi,
      address: contracts.Collection,
      functionName: "tokenURI",
      args: [id],
    })),
  });
  console.log(tokenUriResults);

  const uris = useMemo(
    () => tokenUriResults?.map((uri) => uri.result as string),
    [tokenUriResults],
  );

  useEffect(() => {
    if (!uris || uris.length === 0) return;

    const fetchMetadata = async () => {
      setLoading(true);
      try {
        const metadataPromises = uris.map(async (uri) => {
          if (!uri) return null;

          // Handle IPFS URIs
          const fetchUri = handleImageUri(uri).replace(".json", "");

          const response = await fetch(fetchUri);
          const metadata: NFTMetadata = await response.json();

          return metadata;
        });

        const results = await Promise.all(metadataPromises);
        setNftMetadata(results.filter((m): m is NFTMetadata => m !== null));
      } catch (error) {
        console.error("Failed to fetch metadata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [uris]);

  return (
    <div className={"mb-10"}>
      <Typography variant={"h4"} className={"mb-6"}>
        Your NFTs ({balance})
      </Typography>
      <div className="grid xl:grid-cols-6 md:grid-cols-4 gap-6">
        {nftMetadata?.map((metadata) => (
          <div key={metadata.name} className={"rounded-lg overflow-hidden"}>
            <Image
              src={handleImageUri(metadata.image).replace(".json", "")}
              alt={""}
              width={1000}
              height={1000}
            />
            <Typography className={"mt-2"}>{metadata.name}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
