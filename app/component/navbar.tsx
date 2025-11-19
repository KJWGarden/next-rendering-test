"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "CSR", href: "/csr", description: "Client-Side Rendering" },
  { name: "SSR", href: "/ssr", description: "Server-Side Rendering" },
  { name: "SSG", href: "/ssg", description: "Static Site Generation" },
  { name: "ISR", href: "/isr", description: "Incremental Static Regeneration" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            Next.js Rendering Test
          </Link>
          <div className="flex gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                  title={item.description}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
