import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { navLinks } from "@/config/nav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { shortenId } from "@outofgas/utils";
import { useAuth } from "@/hooks/use-auth";
import { MenuIcon, PowerIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export const Header = () => {
  const { isAuthenticated, address, login, logout } = useAuth();
  const router = useRouter();

  return (
    <header
      className={
        "py-4 fixed w-full z-500000000 top-0 bg-foreground/1 backdrop-blur-2xl"
      }
    >
      <div className="container mx-auto flex items-center px-4">
        <Link href={"/"}>
          <Image src="/logo.png" alt="logo" width={90} height={36} />
        </Link>

        <div className={"ml-12 lg:flex items-center gap-6 hidden"}>
          {/*{navLinks.map((link) => (*/}
          {/*  <Link*/}
          {/*    href={link.href}*/}
          {/*    key={link.id}*/}
          {/*    target={link.href.includes("https") ? "_blank" : "_self"}*/}
          {/*    rel="noopener noreferrer"*/}
          {/*  >*/}
          {/*    {link.title}*/}
          {/*  </Link>*/}
          {/*))}*/}
        </div>

        <Drawer>
          <DrawerTrigger>
            <MenuIcon className={"ml-4 sm:hidden"} />
          </DrawerTrigger>
          <DrawerContent>
            <div className={"flex flex-col gap-6 pb-20 pt-10"}>
              {/*{navLinks.map((link) => (*/}
              {/*  <Link*/}
              {/*    href={link.href}*/}
              {/*    key={link.id}*/}
              {/*    target={link.href.includes("https") ? "_blank" : "_self"}*/}
              {/*    rel="noopener noreferrer"*/}
              {/*    className={"block px-8"}*/}
              {/*  >*/}
              {/*    {link.title}*/}
              {/*  </Link>*/}
              {/*))}*/}
            </div>
          </DrawerContent>
        </Drawer>

        <div className={"ml-auto"}>
          {isAuthenticated && address && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className={"font-semibold"}>
                  {shortenId(address)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className={"w-full font-bold"}
                align={"center"}
                sideOffset={8}
              >
                <DropdownMenuItem
                  className={"flex justify-start"}
                  onClick={logout}
                >
                  <PowerIcon className={"text-foreground"} /> Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {!isAuthenticated && (
            <Button variant={"default"} onClick={login}>
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
