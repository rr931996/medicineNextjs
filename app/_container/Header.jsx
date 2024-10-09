import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Header() {
    const Menu = [
        {
            id: 1,
            name: "Home",
            path: "/"
        },
        {
            id: 2,
            name: "Add",
            path: "/Add"
        },
        {
            id: 3,
            name: "Contact Us",
            path: "/Contact"
        }
    ];
    
    return (
        <div className="flex items-center justify-between p-4 shadow-sm">
            <div className="flex items-center gap-10">
                <Image src='/images/logo.svg' alt='logo' width={180} height={80} />
                <ul className='md:flex gap-8 hidden'>
                    {Menu.map((item) => (
                        <li key={item.id} className="hover:text-primary cursor-pointer hover:scale-105 transition-all ease-out">
                            <Link href={item.path}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <button>Logout</button>
        </div>
    );
}

export default Header;
