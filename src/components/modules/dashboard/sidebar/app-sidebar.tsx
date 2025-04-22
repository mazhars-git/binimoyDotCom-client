"use client";

import * as React from "react";
import {
  Bot,
  History,
  Home,
  List,
  Settings,
  SquareTerminal,
  User,
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
import { useUser } from "@/context/UserContext";

// This is sample data.
const data = {
  userNav: [
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
          url: "/dashboard/profile/change-password",
        },
        {
          title: "Account Settings",
          url: "/dashboard/profile/change-status",
        },
      ],
    },
  ],
  adminNav: [
    {
      title: "Dashboard",
      url: "/dashboard/admin",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Listings Management",
      url: "/dashboard/admin/listings",
      icon: List,
    },
    {
      title: "User Management",
      url: "/dashboard/admin/user-management",
      icon: User,
    },

    {
      title: "Settings",
      url: "/dashboard/admin/profile",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/dashboard/admin/profile",
        },
        {
          title: "Change Password",
          url: "/dashboard/admin/profile/change-password",
        },
        {
          title: "Account Settings",
          url: "/dashboard/profile/change-status",
        },
      ],
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

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
        <NavMain
          items={user?.role === "admin" ? data.adminNav : data.userNav}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
