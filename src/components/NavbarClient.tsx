"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@components/ui/button";
import ModeToggle from "@components/ModeToggle";
import { SheetTrigger, SheetContent, Sheet } from "@components/ui/sheet";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Experience", href: "/experience" },
];

type ProfileData = {
  avatar: string;
  name: string;
};

export default function NavbarClient({ profile }: { profile: ProfileData }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/80 border-b border-border/45 backdrop-blur-md shadow-xs" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="justify-between flex max-w-7xl mx-auto px-6 py-3">
        <Header profile={profile} />
        <NavigationMenu />
      </div>
    </nav>
  );
}

function Header({ profile }: { profile: ProfileData }) {
  return (
    <div className="flex justify-between items-center w-full">
      <Link href="/" className="flex items-center">
        <ProfileIcon src={profile.avatar} />
        <span className="sr-only">{profile.name}</span>
        <span className="text-lg font-medium text-gray-900 dark:text-gray-100 ml-3">
          {profile.name.toUpperCase()}
        </span>
      </Link>
    </div>
  );
}

function NavigationMenu() {
  return (
    <div className="flex items-center">
      <DesktopNavigation />
      <MobileNavigation />
    </div>
  );
}

function DesktopNavigation() {
  return (
    <div className="hidden lg:flex items-center">
      <NavigationLinks desktop />
      <ModeToggle />
    </div>
  );
}

function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="lg:hidden" size="icon" variant="outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <NavigationLinks mobile />
        <ModeToggle />
      </SheetContent>
    </Sheet>
  );
}

function NavigationLinks({ desktop = false, mobile = false }: { desktop?: boolean; mobile?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className={`flex lg:flex-row flex-col ${mobile ? "mt-4" : ""} gap-2`}>
      {navigation.map((item, idx) => (
        <NavLink key={idx} href={item.href} active={pathname === item.href} desktop={desktop} mobile={mobile}>
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}

function NavLink({ children, href, active, desktop = false, mobile = false }: { children: React.ReactNode; href: string; active: boolean; desktop?: boolean; mobile?: boolean }) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-primary text-primary-foreground shadow-xs"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}

function ProfileIcon(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      {...props}
      className="h-12 w-12 rounded-full"
      alt="Profile picture"
    />
  );
}
