"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type { Branch } from "@/types/product";

function branchFromPath(pathname: string): Branch | "parent" {
  if (pathname.startsWith("/fahl")) return "fahl";
  if (pathname.startsWith("/aniqa")) return "aniqa";
  return "parent";
}

export function BranchTheme() {
  const pathname = usePathname();
  useEffect(() => {
    const branch = branchFromPath(pathname);
    document.documentElement.setAttribute("data-branch", branch);
    return () => {
      document.documentElement.removeAttribute("data-branch");
    };
  }, [pathname]);

  return null;
}
