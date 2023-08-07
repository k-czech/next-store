import Link from 'next/link'
import { useRouter } from 'next/router'
import { CartBar } from '@/components/Cart/CartBar'

export const Header = () => {
  const router = useRouter()

  return (
    <header className="bg-gray-200 px-4 py-2 flex items-center justify-between">
      <nav className="space-x-2">
        <Link
          href="/"
          className={router.pathname === '/' ? 'text-blue-400' : ''}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={router.pathname === '/about' ? 'text-blue-400' : ''}
        >
          About
        </Link>
      </nav>
      <CartBar />
    </header>
  )
}
