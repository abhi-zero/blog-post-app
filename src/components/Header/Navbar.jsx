import React, { useState } from "react";
import { NavLink } from "react-router-dom"; 
import { navLinks } from "../../content";
import { GiHamburgerMenu } from "react-icons/gi";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {


  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="top-0 right-0 left-0 fixed md:px-[30px] lg:px-[150px] md:py-[10px] w-[100vw]">
      <nav className="rounded-2xl">
       <div className="flex justify-between items-center md:dark:bg-[#FFFFFF]/[20%] dark:bg-[white] md:backdrop-blur-md px-[20px] sm:px-[50px] py-[20px] md:rounded-2xl rounded-b-2xl text-[black] md:text-[#FFFFFF]">
         <div>
          <h1 className="font-bold text-2xl">InkFlow</h1>
        </div>
        {/* desktop */}
        <div className="hidden md:block"> 
          <ul className="flex gap-10">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className="relative px-2.5 py-1.5 overflow-hidden"
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    [
                      "relative px-2.5 py-1.5 z-10 after:content-[''] after:absolute after:inset-0 text-[#3B82F6]",
                      "after:top-full hover:after:top-0 after:bg-[#FFFFFF] after:rounded-xl",
                      "after:transition-all after:duration-300 after:ease-in-out after:z-0 ",
                      isActive ? "dark:bg-[#FFFFFF] rounded-xl after:opacity-0" : "",
                    ].join(" ")
                  }
                >
                  <span className="z-10 relative">{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-5">
          <div>
            <ThemeToggle />
        </div>
        <div className="md:hidden block">
          <button className="text-xl"
          onClick={() => setMenuOpen(prev => !prev)}
          ><GiHamburgerMenu /> </button>
        </div>
        </div>
       </div>
       {/* {mobile} */}
       <div className={`md:hidden block bg-[#3B82F6] mt-2.5 px-[30px] py-[20px] rounded-xl ${menuOpen ? 'opacity-100': 'opacity-0'} transition-all duration-300 ease-in-out`}> 
            <ul className="flex flex-col items-center-safe gap-2.5">
              {navLinks.map((link)=>(
                <li 
                className=""
                  key={link.name}
                >
                 <NavLink 
                 className='text-white'
                 to={link.path}
                 >
                   {link.name}
                 </NavLink>
                </li>
              ))}
            </ul>
       </div>
      </nav>
    </header>
  );
}
