import { useTag } from './contexts/TagContext.tsx';

const buttonStyle = {
    backgroundColor: '#16a34a',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    width: '5rem',
}

const SearchSortFilter = () => {
    
    const tags = ['All', 'Italian', 'South Asian', 'Vegetarian', 'Vegan', 'Dairy-Free', 'Gluten-Free', 'Student-Made', 'Dessert', 'Organic']

    const { setSelectedTag } = useTag();

    const handleClick = (item : string) => {
        setSelectedTag(item);
    }

    return (
        <div className="flex justify-center gap-4 mb-4">
            <button style={buttonStyle}>Search</button>
            <button style={buttonStyle}>Sort</button>
            
            {/* Drop-down menu for filter button */}
            <div className="group">
                <button style={buttonStyle}>Filter</button>
                <ul className="py-2 grid grid-cols-1 bg-gray-200 absolute opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none z-10">
                    {tags.map((item) => (
                        <li key={item} className="px-4 py-2 hover:bg-gray-300 cursor-pointer" onClick={() => handleClick(item)}>{item}</li>
                    ))}
                </ul>
            </div>
            
        </div>
    )
}

export default SearchSortFilter;