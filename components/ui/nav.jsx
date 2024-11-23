"use client";

import React, { forwardRef, useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

import { IoIosColorPalette } from "react-icons/io";

import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input"
import { IoCartSharp } from "react-icons/io5";

import { BiSolidPencil } from "react-icons/bi";
import { PiSignInBold } from "react-icons/pi";

import { IoMenu } from "react-icons/io5";

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function Nav() {

  const [loggedIn, setLoggedIn] = useState(false);  

  function handleSellClick () {
    if (!loggedIn) {
      alert("Please log in to sell your art");
    } else {
      window.location.href = "/sell";
    }
  }

  return (
    <div className="w-full flex justify-between items-center h-20 gap-2">
      <div className="flex justify-center items-center">
      <Link className="flex justify-center items-center h-10 w-32 mr-2 rounded-md hover:bg-gray-100" href="/">
        {/*<IoIosColorPalette className="text-5xl text-[#007BFF] hover:text-[#1a89ff]"/>*/}
        <img src="/logo.png" className="h-10 w-32 p-2"/>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger><Link href="/explore">Explore</Link></NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/explore"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Explore
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Embark on a Visual Journey Through Artistic Expression: From Timeless Paintings and Intricate Drawings to Innovative Digital Creations, Explore a World of Inspiration, Creativity, and Beauty
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/explore/paintings" title="Paintings">
                  Explore Our Curated Collection of Paintings
                </ListItem>
                <ListItem href="/explore/drawings" title="Drawings">
                  Discover Our Captivating Selection of Drawings
                </ListItem>
                <ListItem href="/explore/digital" title="Digital Art">
                  Experience the Creativity of Digital Artworks
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {loggedIn && (
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Sell
                </NavigationMenuLink>
              </Link>
            )}
            {!loggedIn && (             
              <div className="cursor-pointer">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <div className="origin-top-center relative h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]">                   
                          Sell
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>You must be signed in to do that</AlertDialogTitle>
                        <AlertDialogDescription>
                          Continue to sign in now or cancel to go back.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Sign In</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </NavigationMenuLink>         
              </div>      
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>      
      </div>
      {/*<CiSearch className="text-3xl text-[#111111]"/>*/}
      <div className="flex justify-center items-center gap-4 w-full">
        {/*
        <div className="bg-white hover:bg-gray-100 py-[0.25rem] px-[0.5rem] rounded-lg flex justify-center items-center">
          <IoCartSharp className="text-3xl text-[#111111]"/>        
        </div>
        */}
        <div className="relative w-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-2 top-2.5 h-4 w-4 text-muted-foreground">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input 
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-8" 
            placeholder="Search" 
          />
        </div>
        <Button variant={"outline"}><BiSolidPencil/>Sign Up</Button>        
        <Button className="bg-[#007BFF] hover:bg-[#1a89ff]"><PiSignInBold />Sign In</Button>
        {/*<IoMenu className="text-4xl text-[#111111]"/>*/}
      </div>

    </div>
  );
}

const ListItem = forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
