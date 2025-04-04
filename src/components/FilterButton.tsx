import { useTag } from "../contexts/ExportContexts";

const buttonStyle = {
  backgroundColor: "var(--color-fern)",
  color: "white",
  fontWeight: "600",
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  width: "6rem",
  fontFamily: "Inter, sans-serif",
};

const SearchSortFilter = () => {
  const tags = [
    "All",
    "Italian",
    "South Asian",
    "Vegetarian",
    "Vegan",
    "Dairy-Free",
    "Gluten-Free",
    "Student-Made",
    "Dessert",
    "Organic",
  ];

  const { setSelectedTag } = useTag();

  const handleClick = (item: string) => {
    setSelectedTag(item);
  };

  return (
    <div className="flex justify-center gap-4 mb-4">
      <button style={buttonStyle}>Search</button>
      <button style={buttonStyle}>Sort</button>

      <div className="group">
        <button style={buttonStyle}>Filter</button>
        <ul className="py-2 grid grid-cols-1 rounded-md absolute opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none z-10 shadow-md filter-dropdown">
          {tags.map((item) => (
            <li
              key={item}
              className="px-4 py-2 cursor-pointer font-medium filter-dropdown-item"
              onClick={() => handleClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchSortFilter;
