import { Metadata } from 'next'
import { SearchProfileResultList, SearchBar } from '@/widgets/search-profile'

export const metadata: Metadata = {
  title: 'Search',
}

const SearchPage: React.FC = () => (
  <div>
    <div className="p-4 pb-7 pt-5">
      <SearchBar />
    </div>
    <SearchProfileResultList />
  </div>
)

export default SearchPage
