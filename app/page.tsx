import { Mint } from "@/components/mint";
import { UserNFTs } from "@/components/user-nfts";

export default function Home() {
  return (
    <div className="container mx-auto">
      <UserNFTs />
      <Mint
        resource={{
          name: "/mint",
          desc: "Mint",
          url: "https://mint-nft-api.naven.network/mint",
          price: "$0.1",
          chainId: 196,
        }}
      />
    </div>
  );
}
