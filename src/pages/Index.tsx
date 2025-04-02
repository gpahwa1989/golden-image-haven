
import { useState } from "react";
import { Header } from "@/components/Header";
import { SearchFilter } from "@/components/SearchFilter";
import { ImageCard } from "@/components/ImageCard";
import { ImageTable } from "@/components/ImageTable";
import { goldenImages } from "@/data/images";
import { GoldenImage } from "@/types/image";
import { ArrowUpRight, Package } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<{
    languagePack?: string;
    verified?: boolean;
  }>({});
  const [view, setView] = useState<"grid" | "table">("grid");

  // Filter images based on search query and filters
  const filteredImages = goldenImages.filter((image) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !image.name.toLowerCase().includes(query) &&
        !image.description.toLowerCase().includes(query) &&
        !image.tags.some((tag) => tag.toLowerCase().includes(query))
      ) {
        return false;
      }
    }

    // Language filter
    if (filters.languagePack && image.languagePack !== filters.languagePack) {
      return false;
    }

    // Verified filter
    if (filters.verified && !image.verified) {
      return false;
    }

    return true;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: {
    languagePack?: string;
    verified?: boolean;
  }) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        <div className="container px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Golden Image Repository</h1>
                <p className="mt-1 text-lg text-muted-foreground">
                  Centrally managed Docker base images for RHEL 9
                </p>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <span className="flex items-center text-blue-600 font-medium">
                  <Package className="h-4 w-4 mr-1" />
                  {filteredImages.length} Images Available
                </span>
                <span className="text-muted-foreground">|</span>
                <a href="#" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                  Documentation
                  <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <SearchFilter
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                onViewChange={setView}
                view={view}
              />

              {filteredImages.length === 0 ? (
                <div className="text-center py-16">
                  <Package className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">No images found</h3>
                  <p className="mt-1 text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              ) : view === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredImages.map((image) => (
                    <ImageCard key={image.id} image={image} />
                  ))}
                </div>
              ) : (
                <ImageTable images={filteredImages} />
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>Golden Image Haven • Enterprise Platform Team</p>
            <p className="mt-1">© 2023-2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
