
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GoldenImage } from "@/types/image";
import { CheckCircle, Clock, Copy, Download, Calendar } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface ImageCardProps {
  image: GoldenImage;
}

export const ImageCard = ({ image }: ImageCardProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  // Determine language-specific styling
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
  
  const daysUntilEOL = calculateDaysUntilEOL(image.eolDate);
  
  const handleCopyCommand = () => {
    navigator.clipboard.writeText(image.usageInstructions);
    setCopied(true);
    toast({
      title: "Command copied to clipboard",
      description: image.usageInstructions,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
        <div>
          <div className="flex items-center space-x-2">
            <span className={`inline-block w-3 h-3 rounded-full bg-${image.languagePack.toLowerCase() === "python" ? "blue" : image.languagePack.toLowerCase() === "go" ? "cyan" : image.languagePack.toLowerCase() === "java" ? "orange" : image.languagePack.toLowerCase() === "nodejs" ? "green" : image.languagePack.toLowerCase() === ".net" ? "purple" : "red"}-500`}></span>
            <span className={`language-badge ${getLanguageBadgeClass(image.languagePack)}`}>
              {image.languagePack} {image.languageVersion}
            </span>
          </div>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">{image.name}</h3>
        </div>
        {image.verified && (
          <Badge variant="outline" className="flex items-center space-x-1 bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3" />
            <span>Verified</span>
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{image.description}</p>
        
        <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <span className="font-medium">Base OS:</span>
          </div>
          <div>
            {image.baseOS} {image.osVersion}
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <span className="font-medium">Size:</span>
          </div>
          <div>{image.size}</div>
          
          <div className="flex items-center text-muted-foreground">
            <span className="font-medium">Updated:</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
            {formatDate(image.lastUpdated)}
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <span className="font-medium">EOL:</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
            <span className={daysUntilEOL < 90 ? "text-red-600 font-medium" : ""}>
              {formatDate(image.eolDate)}
            </span>
          </div>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {image.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {image.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{image.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button asChild variant="outline" size="sm">
          <Link to={`/image/${image.id}`}>View Details</Link>
        </Button>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="ghost" 
            className="flex items-center gap-1 h-9 px-2.5" 
            onClick={handleCopyCommand}
          >
            {copied ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only md:not-sr-only">Copy</span>
          </Button>
          <Button size="sm" variant="default" className="flex items-center gap-1 h-9">
            <Download className="h-4 w-4" />
            <span className="sr-only md:not-sr-only">Pull</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
