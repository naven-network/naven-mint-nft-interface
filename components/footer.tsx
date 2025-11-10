import Image from "next/image";
import Link from "next/link";
import { TwitterIcon } from "lucide-react";

export const Footer = () => {
  return (
    <div className={"pt-10 pb-6"}>
      <div className="container mx-auto px-4 flex items-center justify-center gap-4 mb-12">
        <Link href={"https://x.com/NavenNetwork"} target={"_blank"}>
          <TwitterIcon />
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="flex items-center gap-1">
          <Image src="/logo.png" alt="logo" width={42} height={42} />
        </div>
      </div>
    </div>
  );
};
