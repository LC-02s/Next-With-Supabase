import { LikeLink } from './like-link'
import { RootLink } from './root-link'
import { SearchBar } from './search-bar'

export const Header: React.FC = () => (
  <header className="fixed inset-x-0 top-0 z-50 inline-flex items-center justify-between border-x-0 border-b border-t-0 border-solid border-gray-400 bg-white dark:border-dark-400 dark:bg-dark-800">
    <div className="mx-auto flex h-16 w-full max-w-screen-xl items-center justify-between px-6 py-2">
      <div className="flex items-center space-x-7">
        <h1 className="text-xl font-bold text-[#E50914]">
          <RootLink className="p-1">TMDBFLIX</RootLink>
        </h1>
        <nav>
          <ul className="flex items-center space-x-3">
            <li>
              <RootLink className="hover:underline">Movies</RootLink>
            </li>
            <li>
              <RootLink className="hover:underline">Dramas</RootLink>
            </li>
            <li>
              <LikeLink className="hover:underline">Likes</LikeLink>
            </li>
          </ul>
        </nav>
      </div>
      <SearchBar />
    </div>
  </header>
)
