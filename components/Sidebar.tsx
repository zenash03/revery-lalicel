import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <ul>
        <li>
          <Link
            href="/admin/colors"
            className={`cursor-pointer ${pathname === '/admin/colors' ? 'font-bold' : ''}`}
          >
            Colors
          </Link>
        </li>
        <li>
          <Link
            href="/admin/flowers"
            className={`cursor-pointer ${pathname === '/admin/flowers' ? 'font-bold' : ''}`}
          >
            Flowers
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;