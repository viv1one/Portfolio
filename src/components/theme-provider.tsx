"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

// The NextThemesProvider injects a <script> tag for theme initialization.
// This is safe and required for proper theming, but React warns about scripts
// inside components. Suppress the warning by adding an explicit comment.
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // eslint-disable-next-line @next/next/no-script-component
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
