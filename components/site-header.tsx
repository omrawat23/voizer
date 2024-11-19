"use client"

import Link from "next/link"
import { ShadowInnerIcon } from "@radix-ui/react-icons"

import { siteConfig } from "@/config/site"
import { ThemeToggle } from "@/components/theme-toggle"
import MaxWidthWrapper from "./MaxWidthWrapper"

export function SiteHeader() {

  return (
    <MaxWidthWrapper maxWidth="lg">
    <header className="sticky top-0 z-40  border-b bg-background">
      <div className="container flex h-16 items-center justify-between space-x-4">
        <Link href="/" className="flex items-center space-x-2 ">
          <ShadowInnerIcon className="h-4 w-4" aria-hidden="true" />
          <span className="hidden font-bold md:inline-block">
            {siteConfig.name}
          </span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
    </MaxWidthWrapper>
  )
}
