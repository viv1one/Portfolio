import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { getPortfolioSocialLinks } from '@lib/content'

export default function Footer() {
  const socialLinks = getPortfolioSocialLinks();
  return (
    <footer>
    <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
        <Link href="/">
            <Image width={25} height={25} src="/favicon.ico" alt="Logo"></Image>
        </Link>

        <p className="text-sm text-gray-600 dark:text-gray-300">© Copyright {new Date().getFullYear()}. All Rights Reserved.</p>

        <div className="flex -mx-2">
            {socialLinks.map((item) => (
              <Link key={item.name} href={item.href} className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label={item.name}>
                <Image width={20} height={20} className="w-5 h-5" src={item.link} alt={item.name} />
              </Link>
            ))}
        </div>
    </div>
</footer>

  )
}

