import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, List, Globe, Instagram, Linkedin, Github, MessageSquare, MessageCircle } from "lucide-react";

function Sidebar({ sidebarOpen, setSidebarOpen, variant = 'default' }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === "true");

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div className={`fixed inset-0 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} aria-hidden="true"></div>

      {/* Sidebar */}
      <div id="sidebar" ref={sidebar}
        className={`bg-[#0A0A0A] flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} ${variant === 'v2' ? 'border-r border-gray-200 dark:border-gray-700/60' : ' shadow-sm'}`}>

        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-600 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}>
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>

          {/* Logo */}
          <NavLink end to="/" className="flex gap-2">
          <img src="/logo.png" alt="logo" className="w-10" /> <h1 className="text-2xl mt-1 font-bold text-gray-400">Beatscape</h1>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-4">
          <NavLink to="/" className="flex items-center text-gray-400 hover:text-white p-2 rounded-lg">
            <Home />
            <span className="ml-2 lg:inline">{sidebarExpanded ? "Home" : "Home"}</span>
          </NavLink>

          <NavLink to="/playlist" className="flex items-center text-gray-400 hover:text-white p-2 rounded-lg">
            <List />
            <span className="ml-2 lg:inline">{sidebarExpanded ? "Playlist" : "Playlist"}</span>
          </NavLink>
        </div>

        <hr className="my-4 border-gray-600" />

        <div className="space-y-4">
          <a href="https://frontendgenie.netlify.app/" target="_blank" className="flex items-center text-gray-400 hover:text-white p-2 rounded-lg">
            <Globe />
            <span className="ml-2 lg:inline">{sidebarExpanded ? "Portfolio" : "Portfolio"}</span>
          </a>

          <a href="https://instagram.com/furqan_.26" target="_blank" className="flex items-center text-gray-400 hover:text-white p-2 rounded-lg">
            <Instagram />
            <span className="ml-2 lg:inline">{sidebarExpanded ? "Instagram" : "Instagram"}</span>
          </a>

          <a href="https://www.linkedin.com/in/furqan-ansari-frontnedgenie/" target="_blank" className="flex items-center text-gray-400 hover:text-white p-2 rounded-lg">
            <Linkedin />
            <span className="ml-2 lg:inline">{sidebarExpanded ? "LinkedIn" : "LinkedIn"}</span>
          </a>

          <a href="https://github.com/Ansari-Furkan-26" target="_blank" className="flex items-center text-gray-400 hover:text-white p-2 rounded-lg">
            <Github />
            <span className="ml-2 lg:inline">{sidebarExpanded ? "GitHub" : "GitHub"}</span>
          </a>

          <a href="https://wa.me/7045992776" target="_blank" className="flex items-center text-gray-400 hover:text-white p-2 rounded-lg">
            <MessageCircle />
            <span className="ml-2 lg:inline">{sidebarExpanded ? "WhatsApp" : "WhatsApp"}</span>
          </a>
        </div>

        <div className="mt-auto p-4 text-sm text-gray-500 italic text-center">
          "Code like poetry should flow seamlessly."
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="w-12 pl-4 pr-3 py-2">
            <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="shrink-0 fill-current text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
