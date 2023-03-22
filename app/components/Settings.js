import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
// import { SunIcon, MoonIcon } from '@heroicons/react/outline'
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Backup Icon
// {darkMode ? (
//     <MoonIcon className="w-6 h-6"/>
//     ) : (
//     <SunIcon className="w-6 h-6"/>
// )}

export default function Settings({ logout, user, toggleDarkMode, darkMode }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {/* Profile Picture */}
      <Menu.Button>
        {user.photoURL ? (
          <img
            className="inline-block w-12 h-12 rounded-full "
            src={user.photoURL}
            alt="profile"
          />
        ) : (
          <span className="inline-block w-12 h-12 overflow-hidden rounded-full bg-slate-100">
            <svg
              className="w-full h-full text-gray-300 "
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        )}
      </Menu.Button>

      {/* Popup */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg 0 ring-1 ring-black ring-opacity-5 focus:outline-none ">
          {/* Signed in User */}
          <div className="px-4 py-4">
            <p className="text-sm ">Signed in as</p>
            <p className="text-sm font-medium text-gray-900 truncate ">
              {user.email ? user.email : user.displayName}
            </p>
          </div>
          {/* Appearence (Light/Day) */}
          <div className="block px-4 py-3 ">
            <span className="sr-only">Set Theme</span>
            <p
              onClick={toggleDarkMode}
              className="flex text-sm text-gray-700 cursor-pointer "
            >
              Appearence
              {darkMode ? " (dark)" : " (light)"}
            </p>
          </div>
          <div className="py-1">
            {/* Account Settings */}
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/account-settings"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900  " : "text-gray-700 ",
                    "block px-4 py-3 text-sm"
                  )}
                >
                  Account Settings
                </Link>
              )}
            </Menu.Item>
            {/* Support */}
            <Menu.Item>
              {({ active }) => (
                <a
                  href="https://twitter.com/simonsjournal"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900 " : "text-gray-700 ",
                    "block px-4 py-3 text-sm"
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item>
            {/* Report */}
            <Menu.Item>
              {({ active }) => (
                <a
                  href="https://github.com/simoncarriere/firebasetailwind-authboiler/issues"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900 " : "text-gray-700 ",
                    "block px-4 py-3 text-sm"
                  )}
                >
                  Report Bug
                </a>
              )}
            </Menu.Item>
          </div>
          {/* Logout */}
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="submit"
                  onClick={logout}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900 " : "text-gray-700 ",
                    "block w-full text-left px-4 py-3 text-sm"
                  )}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
