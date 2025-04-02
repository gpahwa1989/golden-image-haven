
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 w-full bg-white/90 backdrop-blur-sm border-b border-slate-200">
      <div className="container px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                fill="none"
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="w-5 h-5 text-white"
              >
                <path d="M21 2H3v18h6.6a7 7 0 0 0 7.2-6.5 8 8 0 0 0-2.4-6.4L9.8 2"/>
                <path d="M8 22V2"/>
              </svg>
            </div>
            <span className="font-bold text-xl">Golden Image Haven</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative rounded-md overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search images..."
              className="block w-full bg-gray-50 border-0 py-1.5 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" asChild>
              <Link to="/">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/documentation">Documentation</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/support">Support</Link>
            </Button>
          </nav>
          
          <Button size="sm" className="hidden md:inline-flex">
            Upload New Image
          </Button>
          
          <Button variant="outline" size="icon" className="md:hidden">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};
