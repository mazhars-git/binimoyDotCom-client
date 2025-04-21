"use client";

import * as React from "react";
import {
  Bot,
  History,
  Home,
  List,
  Settings,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/modules/dashboard/sidebar/nav-main";
import { NavUser } from "@/components/modules/dashboard/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Listing",
      url: "/dashboard/listing",
      icon: List,
    },
    {
      title: "Sales History",
      url: "/dashboard/sales-history",
      icon: History,
    },
    {
      title: "Purchase History",
      url: "/dashboard/purchase-history",
      icon: History,
    },
    {
      title: "Wish List",
      url: "/dashboard/wishlist",
      icon: List,
    },
    {
      title: "Messages",
      url: "/messages",
      icon: Bot,
    },
    {
      title: "Settings",
      url: "/dashboard/profile",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/dashboard/profile",
        },
        {
          title: "Change Password",
          url: "#",
        },
      ],
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">
                  <Home />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-bold text-xl">AdolBodol</h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
