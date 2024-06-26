import { IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
export default function SearchBar() {
  return (
    <div className="relative">
      <input
        className="flex grow h-10 w-full rounded-md border border-input bg-background px-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        id="search"
        type="text"
        placeholder="Start typing to search"
      />
      <div className="absolute right-0 top-0 h-full flex items-center pr-2">
        <IconButton
          aria-label="Search database"
          icon={<SearchIcon />}
          size="sm"
        />
      </div>
    </div>
  );
}
