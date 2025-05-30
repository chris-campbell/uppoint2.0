import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

export function useUserSearch(initialQuery: string) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const fetchUsers = debounce(async () => {
      try {
        const res = await fetch(`/api/search-users?q=${query}`);
        const data = await res.json();
        setResults(data);
        setShowDropdown(true);
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 300);

    fetchUsers();
    return () => fetchUsers.cancel();
  }, [query]);

  return { query, setQuery, results, setResults, showDropdown, setShowDropdown };
}
