"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { FileClock, Home, Settings, WalletCards } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import UsageTrack from './UsageTrack'

const SideNav = () => {
    const router = useRouter(); // For navigation
    const currentPath = usePathname(); // Renamed path to currentPath to avoid conflicts

    const MenuList = [
        {
            name: 'Home',
            icon: Home,
            path: '/dashboard'
        },
        {
            name: 'Billing',
            icon: WalletCards,
            path: '/dashboard/billing'
        },
        {
            name: 'Settings',
            icon: Settings,
            path: '/dashboard/settings'
        }
    ]

    useEffect(() => {
        console.log(currentPath);
    }, [currentPath]); // Added currentPath as a dependency for useEffect

    return (
        <div className='h-screen relative p-5 shadow-sm border bg-white'>
            <div className='flex justify-center'>
                <Image src={'/logo.svg'} alt='logo' width={120} height={100} />
            </div>
            <hr className='my-6 border' />

            <div className='mt-3'>
                {MenuList.map((menu, index) => (
                    <div
                        key={index}
                        onClick={() => router.push(menu.path)} // Add router.push to handle navigation
                        className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer items-center ${currentPath == menu.path && 'bg-primary text-white'}`}
                    >
                        <menu.icon className='h-6 w-6' />
                        <h2 className='text-lg'>{menu.name}</h2>
                    </div>
                ))}
            </div>

            <div className='absolute bottom-10 left-0 w-full'>
                <UsageTrack />
            </div>
        </div>
    )
}

export default SideNav
