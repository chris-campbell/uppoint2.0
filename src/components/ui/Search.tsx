"use client";

import { useState, useEffect, useRef } from "react";
import debounce from "lodash.debounce";

export default function UserSearchDropdown() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const fetchUsers = debounce(async () => {
      const res = await fetch(`/api/search-users?q=${query}`);
      const data = await res.json();
      setResults(data);
      setShowDropdown(true);
    }, 300);

    fetchUsers();
    return () => fetchUsers.cancel();
  }, [query]);

  return (
    <div className="relative p-4 w-full max-w-md">
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length && setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)} // delay hides menu AFTER a click
        className="w-full border px-3 py-2 rounded shadow-sm"
        placeholder="Search users..."
        aria-autocomplete="list"
        aria-controls="user-search-dropdown"
        aria-expanded={showDropdown}
        aria-haspopup="listbox"
      />

      {showDropdown && results.length > 0 && (
        <ul
          id="user-search-dropdown"
          role="listbox"
          className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-md max-h-60 overflow-auto"
        >
          {results.map((user: any, index: number) => (
            <li
              key={user.id}
              role="option"
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onMouseDown={() => {
                setQuery(user.name); // populate input with selected user
                setShowDropdown(false); // close menu
              }}
            >
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
