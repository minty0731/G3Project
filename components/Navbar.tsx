import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
function navbar() {
  return (
    <header className="flex h-24 items-center bg-slate-300 px-24">
        <div className="flex items-center">
            <Image src="/image/vegan.png" alt="Logo" width={256} height={256} className="h-14 w-14" ></Image>
        </div>
        <nav className="mx-auto hidden gap-8 text-lg font-medium md:flex">
        <Link href="#" className="hover:text-gray-900 hover:underline" prefetch={false}>
          Quán ăn
        </Link>
        <Link href="#" className="hover:text-gray-900 hover:underline" prefetch={false}>
          Cửa hàng
        </Link>
        <Link href="#" className="hover:text-gray-900 hover:underline" prefetch={false}>
          Siêu thị chay
        </Link>
        <Link href="#" className="hover:text-gray-900 hover:underline" prefetch={false}>
          Đồ dùng chay
        </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <form className="relative ">
            <SearchIcon className="absolute left-2.5 top-2.5 h-5   w-5 text-gray-500 dark:text-gray-400"></SearchIcon>
            <input
              type="search"
              placeholder="Searching Products...."
              className="pl-8 pr-4 p-2 focus:border-gray-900 dark:focus:border-gray-50 rounded"
            />
          </form>
        </div>
    </header>
  )
}
function SearchIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
export default navbar