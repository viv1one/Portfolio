import { getPortfolioProfile } from "@lib/content";
import NavbarClient from "@components/NavbarClient";

export default function Navbar() {
  const profile = getPortfolioProfile();

  return <NavbarClient profile={profile} />;
}