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
    <div>
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length && setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        placeholder="Search users..."
        aria-autocomplete="list"
        aria-controls="user-search-dropdown"
        aria-expanded={showDropdown}
        aria-haspopup="listbox"
      />

      {showDropdown && results.length > 0 && (
        <ul id="user-search-dropdown" role="listbox">
          {results.map((user: any, index: number) => (
            <li
              key={user.id}
              role="option"
              onMouseDown={() => {
                setQuery(user.name);
                setShowDropdown(false);
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
