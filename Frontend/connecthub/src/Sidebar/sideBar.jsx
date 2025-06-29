import { CircleUser, Home, Users, FileBadge, Bell } from 'lucide-react';
import connectIcon from '../assets/connect.svg';
import { useNavigate } from 'react-router-dom';

const TopNav = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Me', icon: CircleUser, href: '/my-profile' },
    { label: 'Home', icon: Home, href: '/home' },
    { label: 'Networks', icon: Users, href: '/networks' },
    { label: 'Jobs', icon: FileBadge, href: '/jobs' },
    { label: 'Notifications', icon: Bell, href: '/notifications' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between">
        
        <a href="/" className="flex items-center space-x-2">
          <img src={connectIcon} className="h-8 w-8" alt="ConnectHub Logo" />
          <span className="text-xl font-semibold text-gray-900 dark:text-white">ConnectHub</span>
        </a>

        
        <ul className="flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.label}>
              <div
                onClick={() => navigate(item.href)}
                className="flex flex-col items-center text-sm text-gray-700 dark:text-gray-200 cursor-pointer"
              >
                <item.icon size={20} />
                <span className="text-xs mt-1">{item.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default TopNav;
