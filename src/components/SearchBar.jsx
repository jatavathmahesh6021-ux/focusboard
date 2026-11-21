import React from "react";
import { Search, X } from "lucide-react";

function SearchBar(props) {
  const searchQuery = props.searchQuery;
  const setSearchQuery = props.setSearchQuery;

  function handleInputChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleClear() {
    setSearchQuery("");
  }

  return (
    <div className="search-bar-wrapper">
      <Search size={18} className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder="Search tasks by title..."
        value={searchQuery}
        onChange={handleInputChange}
        aria-label="Search tasks by title"
      />
      {searchQuery !== "" && (
        <button
          type="button"
          className="clear-search-btn"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;