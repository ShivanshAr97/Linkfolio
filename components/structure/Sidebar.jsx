'use client';
import Link from "next/link";
import {usePathname} from "next/navigation";
import Logout from "../Buttons/Logout";

export default function Sidebar() {
  const path = usePathname();
  return (
    <div className="inline-flex mx-auto flex-col text-center mt-8 gap-2 text-gray-700">
      <Link
        href={'/account'}
        className={
          "flex gap-4 p-2 "
          + (path === '/account' ? 'text-blue-500 border border-blue px-2 py-1 rounded-md' : '')
        }>
        <span className="">My Page</span>
      </Link>
      <Link
        href={'/analytics'}
        className={
          "flex gap-4 p-2 "
          + (path === '/analytics' ? 'text-blue-500 border border-blue px-2 py-1 rounded-md' : '')
        }>
        <span className="">Analytics</span>
      </Link>
      <Logout
        iconLeft={true}
        className={'flex gap-4 items-center text-gray-700 p-2'}
        iconClasses={'w-6 h-6'}
      />
      <Link href={'/'} className="flex items-center gap-2 text-xs text-gray-700 border-t pt-4">
        <span>Back to website</span>
      </Link>
    </div>
  );
}