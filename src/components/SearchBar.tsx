import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [selectedType, setSelectedType] = useState("Items");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const searchTypes = [
        { id: "items", label: "Items" },
        { id: "properties", label: "Properties" },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            const searchUrl =
                selectedType === "Properties"
                    ? `/properties?q=${encodeURIComponent(query.trim())}`
                    : `/search?q=${encodeURIComponent(query.trim())}`;
            navigate(searchUrl);
        }
    };

    const handleTypeSelect = (type: string) => {
        setSelectedType(type);
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full">
            <div className="flex rounded border border-gray-300 bg-white">
                {/* Dropdown Button */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={toggleDropdown}
                        className="inline-flex items-center bg-gray-100 px-5 py-2.5 text-center text-sm font-medium transition-colors hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 focus:outline-none"
                    >
                        {selectedType}
                        <svg
                            className={`ms-3 h-2.5 w-2.5 transition-transform ${
                                isDropdownOpen ? "rotate-180" : ""
                            }`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 z-10 mt-1 w-44 divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white shadow-lg">
                            <ul className="py-2 text-sm text-gray-700">
                                {searchTypes.map((type) => (
                                    <li key={type.id}>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleTypeSelect(type.label)
                                            }
                                            className={`block w-full px-4 py-2 text-left transition-colors hover:bg-gray-100 ${
                                                selectedType === type.label
                                                    ? "bg-blue-50 text-blue-700"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            {type.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Search Icon */}
                <div className="flex items-center justify-center px-2 py-2">
                    <svg
                        className="h-4 w-4 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>

                {/* Input Field */}
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 border-0 bg-transparent px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                    placeholder={`Search ${selectedType}`}
                />

                {/* Search Button */}
                <button
                    type="submit"
                    className="border-l border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
                >
                    Search
                </button>
            </div>

            {/* Backdrop untuk menutup dropdown */}
            {isDropdownOpen && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setIsDropdownOpen(false)}
                />
            )}
        </form>
    );
}
