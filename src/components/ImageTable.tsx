
import { Link } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GoldenImage } from "@/types/image";
import { CheckCircle, Calendar, Copy, Download } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface ImageTableProps {
  images: GoldenImage[];
}

export const ImageTable = ({ images }: ImageTableProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const calculateDaysUntilEOL = (eolDate: string) => {
    const today = new Date();
    const eol = new Date(eolDate);
    const diffTime = eol.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const handleCopyCommand = (image: GoldenImage) => {
    navigator.clipboard.writeText(image.usageInstructions);
    setCopiedId(image.id);
    toast({
      title: "Command copied to clipboard",
      description: image.usageInstructions,
    });
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  const getLanguageBadgeClass = (language: string) => {
    const langLower = language.toLowerCase();
    if (langLower.includes("python")) return "language-badge-python";
    if (langLower.includes("go")) return "language-badge-go";
    if (langLower.includes("java") && !langLower.includes("script")) return "language-badge-java";
    if (langLower.includes("node") || langLower.includes("javascript")) return "language-badge-nodejs";
    if (langLower.includes("net")) return "language-badge-dotnet";
    if (langLower.includes("ruby")) return "language-badge-ruby";
    return "";
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]">Image</TableHead>
            <TableHead className="w-[15%]">Base OS</TableHead>
            <TableHead className="w-[10%]">Size</TableHead>
            <TableHead className="w-[15%]">Updated</TableHead>
            <TableHead className="w-[15%]">EOL Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {images.map((image) => {
            const daysUntilEOL = calculateDaysUntilEOL(image.eolDate);
            return (
              <TableRow key={image.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <Link to={`/image/${image.id}`} className="font-medium hover:underline">
                        {image.name}
                      </Link>
                      {image.verified && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className={`language-badge ${getLanguageBadgeClass(image.languagePack)}`}>
                        {image.languagePack} {image.languageVersion}
                      </span>
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {image.tags.slice(0, 2).join(", ")}
                        {image.tags.length > 2 ? "..." : ""}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {image.baseOS} {image.osVersion}
                </TableCell>
                <TableCell>{image.size}</TableCell>
                <TableCell>{formatDate(image.lastUpdated)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className={daysUntilEOL < 90 ? "text-red-600 font-medium" : ""}>
                      {formatDate(image.eolDate)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0" 
                      onClick={() => handleCopyCommand(image)}
                    >
                      {copiedId === image.id ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="sr-only">Copy</span>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0"
                    >
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Pull</span>
                    </Button>
                    <Button size="sm" variant="outline" asChild className="h-8">
                      <Link to={`/image/${image.id}`}>Details</Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
