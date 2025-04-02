
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, List, Grid } from "lucide-react";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: { languagePack?: string, verified?: boolean }) => void;
  onViewChange: (view: "grid" | "table") => void;
  view: "grid" | "table";
}

export const SearchFilter = ({ 
  onSearch, 
  onFilterChange, 
  onViewChange,
  view
}: SearchFilterProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState<string>("");
  
  const handleSearch = () => {
    onSearch(searchQuery);
  };
  
  const handleLanguageChange = (value: string) => {
    setLanguageFilter(value);
    onFilterChange({ languagePack: value === "all" ? undefined : value });
  };
  
  const handleVerifiedChange = (value: string) => {
    onFilterChange({ verified: value === "verified" ? true : undefined });
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name, description or tags..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              <SelectItem value="Python">Python</SelectItem>
              <SelectItem value="Go">Go</SelectItem>
              <SelectItem value="Java">Java</SelectItem>
              <SelectItem value="Node.js">Node.js</SelectItem>
              <SelectItem value=".NET">.NET</SelectItem>
              <SelectItem value="Ruby">Ruby</SelectItem>
            </SelectContent>
          </Select>
          
          <Select onValueChange={handleVerifiedChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="verified">Verified Only</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Filter className="h-4 w-4" />
          </Button>
          
          <Tabs defaultValue={view} className="hidden md:block">
            <TabsList>
              <TabsTrigger value="grid" onClick={() => onViewChange("grid")}>
                <Grid className="h-4 w-4 mr-1" />
                Grid
              </TabsTrigger>
              <TabsTrigger value="table" onClick={() => onViewChange("table")}>
                <List className="h-4 w-4 mr-1" />
                Table
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
