"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import userData from "@content/data/data";
import { Button } from "@components/ui/button";
import ModeToggle from "@components/ModeToggle";
import { SheetTrigger, SheetContent, Sheet } from "@components/ui/sheet";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/"},
  { name: "About", href: "/about"},
  // { name: "Projects", href: "/projects",},
  { name: "Experience", href: "/experience",},
  // { name: "Blogs", href: "/blogs",},
];



// Navbar component
export default function Navbar() {

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
          ? " backdrop-blur-3xl "
          : ""
      }`}>
      <div className="justify-between flex max-w-7xl mx-auto px-4 py-1">
        <Header /> {/* Render the header section */}
        <NavigationMenu /> {/* Render the navigation menu section */}
      </div> 
    </nav>
  );
}

// Header section with logo and profile picture
function Header() {
  return (
    <div className="flex justify-between items-center w-full">
      <Link href="/" className="flex items-center">
        <ProfileIcon src={userData.avatar} />
        <span className="sr-only">Vivek Kumar</span>
        <span className="text-lg font-medium text-gray-900 dark:text-gray-100 ml-3">
          VIVEK KUMAR
        </span>
      </Link>
    </div>
  );
}

// Navigation menu with links and mode toggle
function NavigationMenu() {
  return (
    <div className="flex items-center">
      <DesktopNavigation /> {/* Navigation links for larger screens */}
      <MobileNavigation /> {/* Navigation links for smaller screens */}
    </div>
  );
}

// Navigation links for larger screens
function DesktopNavigation() {
  return (
    <div className="hidden lg:flex items-center">
      <NavigationLinks desktop />
      <ModeToggle/>{/* Render the navigation menu section */}
    </div>
  );
}

// Navigation links for smaller screens (mobile menu)
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

// Function to render navigation links
function NavigationLinks({ desktop = false, mobile = false }) {
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

// Function to render individual navigation link
function NavLink({ children, href, active, desktop = false, mobile = false }: { children: React.ReactNode, href: string, active: boolean, desktop?: boolean, mobile?: boolean }) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
        active
          ? "bg-gray-900 text-white dark:bg-gray-700 dark:text-gray-300"
          : `hover:bg-gray-100 dark:hover:bg-gray-700 ${
              desktop
                ? "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                : "text-gray-900 dark:text-gray-100"
            }`
      }`}
    >
      {children}
    </Link>
  );
}

// Function to render profile picture
function ProfileIcon(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      {...props}
      className="h-12 w-12 rounded-full"
      alt="Profile picture of Vivek Kumar"
    />
  );
}