'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  HomeIcon, 
  PlusCircleIcon, 
  ClipboardDocumentListIcon, 
  UserCircleIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('seller-token');
    toast.success('Logged out successfully');
    router.push('/seller-login');
  };

  const menuItems = [
    { 
      title: 'Dashboard', 
      path: '/seller/dashboard', 
      icon: HomeIcon 
    },
    { 
      title: 'Add Product', 
      path: '/seller/add-product', 
      icon: PlusCircleIcon 
    },
    { 
      title: 'Manage Products', 
      path: '/seller/manage-product', 
      icon: ClipboardDocumentListIcon 
    },
    { 
      title: 'Profile', 
      path: '/seller/profile', 
      icon: UserCircleIcon 
    },
  ];

  return (
    <>
      <div className="w-72 z-[50] fixed top-0 h-screen bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-md text-white flex flex-col shadow-2xl border-r border-white/5">
        <div className="p-8">
          <h1 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Quickart
            </span>
            <div className="text-sm font-normal mt-1 text-gray-400">Seller Portal</div>
          </h1>
        </div>
        
        <nav className="flex-1 px-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;
              
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white' 
                        : 'hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full" />
                    )}
                    <Icon className={`w-6 h-6 transition-all duration-300
                      ${isActive 
                        ? 'text-blue-400' 
                        : 'text-gray-400 group-hover:text-gray-300 group-hover:scale-110'}`} 
                    />
                    <span className={`font-medium tracking-wide ${isActive ? 'text-white' : 'text-gray-300'}`}>
                      {item.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="p-6 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full mb-4 flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 hover:bg-white/5 text-red-400 hover:text-red-300"
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
            <span className="font-medium tracking-wide">Logout</span>
          </button>
          
          <div className="p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/5">
            <div className="text-sm text-gray-400">
              <span className="block opacity-75">© 2024 Quickart</span>
              <span className="text-xs opacity-50">All rights reserved</span>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-72">
        {/* Content for other seller pages will go here */}
      </div>
    </>
  );
};

export default Sidebar;