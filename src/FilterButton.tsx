const buttonStyle = {
    backgroundColor: '#16a34a',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    width: '5rem',
}

const SearchSortFilter = () => {
    return (
        <div className="flex justify-center gap-4 mb-4">
            <button style={buttonStyle}>Search</button>
            <button style={buttonStyle}>Sort</button>
            <button style={buttonStyle}>Filter</button>
        </div>
    )
}

export default SearchSortFilter;