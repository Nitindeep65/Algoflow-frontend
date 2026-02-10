import { SearchIcon } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

const Search = () => (
  <InputGroup className="w-full max-w-sm bg-background">
    <InputGroupInput placeholder="Search..." />
    <InputGroupAddon align="inline-end" className="pr-2">
      <InputGroupButton size="sm" variant="secondary">
        Search
        <SearchIcon />
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
)

export default Search
