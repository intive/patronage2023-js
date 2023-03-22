"use client";
import { usePathname } from "next/navigation";

import { SideNavigationBar } from "ui";
import { SideNavigationBarItemProps } from "ui/SideNavigationBarItem";

const SideNavBar = () => {
  const currentPathname = usePathname() || "";
  const items: SideNavigationBarItemProps[] = [
    { href: "/menu", icon: "menu", textValue: "Menu" },
    { href: "/history", icon: "history", textValue: "History" },
    { href: "/settings", icon: "settings", textValue: "Settings" },
    {
      href: "/shoppingcart",
      icon: "shopping_cart",
      textValue: "Shopping cart",
    },
  ];

  return <SideNavigationBar items={items} pathname={currentPathname} />;
};

export default SideNavBar;
