"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
    {
        name: "MAIN MENU",
        menuItems: [
            {
                icon: (
                    <svg
                        className="text- fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9.00009 17.2498C8.58588 17.2498 8.25009 17.5856 8.25009 17.9998C8.25009 18.414 8.58588 18.7498 9.00009 18.7498H15.0001C15.4143 18.7498 15.7501 18.414 15.7501 17.9998C15.7501 17.5856 15.4143 17.2498 15.0001 17.2498H9.00009Z"
                            fill=""
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 1.25C11.2749 1.25 10.6134 1.44911 9.88928 1.7871C9.18832 2.11428 8.37772 2.59716 7.36183 3.20233L5.90622 4.06943C4.78711 4.73606 3.89535 5.26727 3.22015 5.77524C2.52314 6.29963 1.99999 6.8396 1.65907 7.55072C1.31799 8.26219 1.22554 9.0068 1.25519 9.87584C1.2839 10.717 1.43105 11.7397 1.61556 13.0219L1.90792 15.0537C2.14531 16.7036 2.33368 18.0128 2.61512 19.0322C2.90523 20.0829 3.31686 20.9169 4.05965 21.5565C4.80184 22.1956 5.68984 22.4814 6.77634 22.6177C7.83154 22.75 9.16281 22.75 10.8423 22.75H13.1577C14.8372 22.75 16.1685 22.75 17.2237 22.6177C18.3102 22.4814 19.1982 22.1956 19.9404 21.5565C20.6831 20.9169 21.0948 20.0829 21.3849 19.0322C21.6663 18.0129 21.8547 16.7036 22.0921 15.0537L22.3844 13.0219C22.569 11.7396 22.7161 10.717 22.7448 9.87584C22.7745 9.0068 22.682 8.26219 22.3409 7.55072C22 6.8396 21.4769 6.29963 20.7799 5.77524C20.1047 5.26727 19.2129 4.73606 18.0938 4.06943L16.6382 3.20233C15.6223 2.59716 14.8117 2.11428 14.1107 1.7871C13.3866 1.44911 12.7251 1.25 12 1.25ZM8.09558 4.51121C9.15309 3.88126 9.89923 3.43781 10.5237 3.14633C11.1328 2.86203 11.5708 2.75 12 2.75C12.4293 2.75 12.8672 2.86203 13.4763 3.14633C14.1008 3.43781 14.8469 3.88126 15.9044 4.51121L17.2893 5.33615C18.4536 6.02973 19.2752 6.52034 19.8781 6.9739C20.4665 7.41662 20.7888 7.78294 20.9883 8.19917C21.1877 8.61505 21.2706 9.09337 21.2457 9.82469C21.2201 10.5745 21.0856 11.5163 20.8936 12.8511L20.6148 14.7884C20.3683 16.5016 20.1921 17.7162 19.939 18.633C19.6916 19.5289 19.3939 20.0476 18.9616 20.4198C18.5287 20.7926 17.9676 21.0127 17.037 21.1294C16.086 21.2486 14.8488 21.25 13.1061 21.25H10.8939C9.15124 21.25 7.91405 21.2486 6.963 21.1294C6.03246 21.0127 5.47129 20.7926 5.03841 20.4198C4.60614 20.0476 4.30838 19.5289 4.06102 18.633C3.80791 17.7162 3.6317 16.5016 3.3852 14.7884L3.10643 12.851C2.91437 11.5163 2.77991 10.5745 2.75432 9.82469C2.72937 9.09337 2.81229 8.61505 3.01167 8.19917C3.21121 7.78294 3.53347 7.41662 4.12194 6.9739C4.72482 6.52034 5.54643 6.02973 6.71074 5.33615L8.09558 4.51121Z"
                            fill=""
                        />
                    </svg>
                ),
                label: "Control Room",
                route: "/dashboard",
            },
            {
                icon: (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
                            fill="currentColor"
                        />
                        <path
                            d="M12 6C11.4477 6 11 6.44772 11 7V12C11 12.5523 11.4477 13 12 13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7C13 6.44772 12.5523 6 12 6Z"
                            fill="currentColor"
                        />
                    </svg>
                ),
                label: "Leading Indicator",
                route: "/dashboard/leading-indicator",
            },
            {
                icon: (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3H4ZM5 19V5H19V19H5Z"
                            fill="currentColor"
                        />
                        <path
                            d="M7 14.5L10 11.5L13 14.5L19 8.5V17H7V14.5Z"
                            fill="currentColor"
                        />
                        <circle cx="9.5" cy="8.5" r="1.5" fill="currentColor" />
                    </svg>
                ),
                label: "Visual Analysis",
                route: "/dashboard/visual-analysis",
            },
            {
                icon: (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4 4C4 3.44772 4.44772 3 5 3H19C19.5523 3 20 3.44772 20 4V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4ZM6 5V19H18V5H6Z"
                            fill="currentColor"
                        />
                        <path d="M8 7H16V9H8V7Z" fill="currentColor" />
                        <path d="M8 11H16V13H8V11Z" fill="currentColor" />
                        <path d="M8 15H13V17H8V15Z" fill="currentColor" />
                    </svg>
                ),
                label: "Reports",
                route: "/dashboard/reports",
            },
        ],
    },
    {
        name: "OTHERS",
        menuItems: [
            {
                icon: (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4 4C4 3.44772 4.44772 3 5 3H19C19.5523 3 20 3.44772 20 4V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4ZM6 5V19H18V5H6Z"
                            fill="currentColor"
                        />
                        <path
                            d="M9 9L11 11L15 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8 14H16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M8 17H13"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                ),
                label: "Task Management",
                route: "/dashboard/task-management",
            },
            {
                icon: (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5Z"
                            fill="currentColor"
                        />
                        <path
                            d="M12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8Z"
                            fill="currentColor"
                        />
                        <circle cx="12" cy="12" r="2" fill="white" />
                    </svg>
                ),
                label: "Targets",
                route: "/dashboard/targets",
            },
            {
                icon: (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3 3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V4C22 3.44772 21.5523 3 21 3H3ZM4 19V5H20V19H4Z"
                            fill="currentColor"
                        />
                        <path d="M6 7H10V11H6V7Z" fill="currentColor" />
                        <path d="M6 13H10V17H6V13Z" fill="currentColor" />
                        <path d="M14 7H18V11H14V7Z" fill="currentColor" />
                        <path d="M14 13H18V17H14V13Z" fill="currentColor" />
                    </svg>
                ),
                label: "Facilities",
                route: "/dashboard/facilities",
            },
        ],
    },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
    const pathname = usePathname();

    const [pageName, setPageName] = useLocalStorage(
        "selectedMenu",
        "dashboard"
    );

    return (
        <ClickOutside onClick={() => setSidebarOpen(false)}>
            <aside
                className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden border-r border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark lg:static lg:translate-x-0 ${
                    sidebarOpen
                        ? "translate-x-0 duration-300 ease-linear"
                        : "-translate-x-full"
                }`}
            >
                {/* <!-- SIDEBAR HEADER --> */}
                <div className="flex items-start justify-center gap-2 px-6 py-2">
                    <Link href="/">
                        <Image
                            width={85}
                            height={85}
                            src={"/logo.svg"}
                            alt="Logo"
                            priority
                            // style={{ width: "auto", height: "auto" }}
                        />
                    </Link>

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="block lg:hidden"
                    >
                        <svg
                            className="fill-current"
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                                fill=""
                            />
                        </svg>
                    </button>
                </div>
                {/* <!-- SIDEBAR HEADER --> */}

                <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                    {/* <!-- Sidebar Menu --> */}
                    <nav className="mt-1 px-4 lg:px-6">
                        {menuGroups.map((group, groupIndex) => (
                            <div key={groupIndex}>
                                <h3 className="mb-5 text-sm font-medium text-dark-4 dark:text-dark-6">
                                    {group.name}
                                </h3>

                                <ul className="mb-6 flex flex-col gap-2">
                                    {group.menuItems.map(
                                        (menuItem, menuIndex) => (
                                            <SidebarItem
                                                key={menuIndex}
                                                item={menuItem}
                                                pageName={pageName}
                                                setPageName={setPageName}
                                            />
                                        )
                                    )}
                                </ul>
                            </div>
                        ))}
                    </nav>
                    {/* <!-- Sidebar Menu --> */}
                </div>
            </aside>
        </ClickOutside>
    );
};

export default Sidebar;
