"use client";

import { Film, User, LogOut, Settings, Heart } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { useLogout } from "@/hooks/useLogout";
import { useSessionStore } from "@/hooks/useSession";
import { Skeleton } from "./Skeleton";
import Link from "next/link";

const Header = () => {
  const { session, loading } = useSessionStore();
  const logout = useLogout();

  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        <Link href={"/"} className="flex items-center space-x-2">
          <Button size={"icon"} variant={"primary"}>
            <Film className="h-6 w-6" />
          </Button>
          <span className="text-xl font-bold text-foreground">TMDB</span>
        </Link>

        <div className="flex items-center space-x-4">
          {loading ? (
            <Skeleton className="h-6 w-6 rounded-full" />
          ) : session ? (
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="/avatar.jpg" alt="User avatar" />
                    <AvatarFallback>AN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Watchlist</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <p className="text-sm font-medium text-primary">
                @{session.name}
              </p>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant={"primary"} size={"sm"}>
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant={"outline"} size={"sm"}>
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
