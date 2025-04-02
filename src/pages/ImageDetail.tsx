
import { useParams, Link } from "react-router-dom";
import { goldenImages } from "@/data/images";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar,
  CheckCircle, 
  ChevronLeft, 
  Clock, 
  Copy, 
  Download, 
  FileCode, 
  FileText, 
  HelpCircle, 
  Info, 
  ServerCrash, 
  Shield 
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const ImageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const image = goldenImages.find(img => img.id === id);
  
  if (!image) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <ServerCrash className="h-12 w-12 mx-auto text-gray-400" />
            <h2 className="mt-4 text-2xl font-semibold">Image not found</h2>
            <p className="mt-2 text-muted-foreground">
              The requested image could not be found.
            </p>
            <Button asChild className="mt-6">
              <Link to="/">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        <div className="container px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <Button variant="outline" asChild>
                <Link to="/">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Image Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2 space-x-2">
                          <span className={`language-badge ${getLanguageBadgeClass(image.languagePack)}`}>
                            {image.languagePack} {image.languageVersion}
                          </span>
                          {image.verified && (
                            <Badge variant="outline" className="flex items-center space-x-1 bg-green-50 text-green-700 border-green-200">
                              <CheckCircle className="h-3 w-3" />
                              <span>Verified</span>
                            </Badge>
                          )}
                          {image.securityScanned && (
                            <Badge variant="outline" className="flex items-center space-x-1 bg-blue-50 text-blue-700 border-blue-200">
                              <Shield className="h-3 w-3" />
                              <span>Security Scanned</span>
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-2xl">{image.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {image.description}
                        </CardDescription>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center" 
                          onClick={handleCopyCommand}
                        >
                          {copied ? (
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4 mr-2" />
                          )}
                          Copy Pull Command
                        </Button>
                        <Button size="sm" className="flex items-center">
                          <Download className="h-4 w-4 mr-2" />
                          Pull Image
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {image.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                      <div className="flex justify-between py-1 border-b">
                        <span className="font-medium text-muted-foreground">Base OS</span>
                        <span>{image.baseOS} {image.osVersion}</span>
                      </div>
                      
                      <div className="flex justify-between py-1 border-b">
                        <span className="font-medium text-muted-foreground">Language Pack</span>
                        <span>{image.languagePack} {image.languageVersion}</span>
                      </div>
                      
                      <div className="flex justify-between py-1 border-b">
                        <span className="font-medium text-muted-foreground">Image Size</span>
                        <span>{image.size}</span>
                      </div>
                      
                      <div className="flex justify-between py-1 border-b">
                        <span className="font-medium text-muted-foreground">Maintainer</span>
                        <span>{image.maintainer}</span>
                      </div>
                      
                      <div className="flex justify-between py-1 border-b">
                        <span className="font-medium text-muted-foreground">Last Updated</span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          {formatDate(image.lastUpdated)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between py-1 border-b">
                        <span className="font-medium text-muted-foreground">End of Life</span>
                        <span className={`flex items-center ${daysUntilEOL < 90 ? "text-red-600 font-medium" : ""}`}>
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          {formatDate(image.eolDate)}
                          {daysUntilEOL < 90 && (
                            <span className="ml-2 text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">
                              {daysUntilEOL} days left
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-slate-50 rounded-md border border-slate-200">
                      <p className="text-sm font-mono overflow-x-auto whitespace-nowrap">
                        {image.usageInstructions}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Image Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="changelog">
                      <TabsList className="mb-4">
                        <TabsTrigger value="changelog">
                          <Clock className="h-4 w-4 mr-2" />
                          Changelog
                        </TabsTrigger>
                        <TabsTrigger value="usage">
                          <FileCode className="h-4 w-4 mr-2" />
                          Usage Instructions
                        </TabsTrigger>
                        <TabsTrigger value="docs">
                          <FileText className="h-4 w-4 mr-2" />
                          Documentation
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="changelog" className="space-y-4">
                        <div className="space-y-6">
                          {image.changelog.map((log) => (
                            <div key={log.version} className="space-y-1">
                              <div className="flex items-baseline justify-between">
                                <h4 className="text-base font-semibold">Version {log.version}</h4>
                                <span className="text-sm text-muted-foreground">{formatDate(log.date)}</span>
                              </div>
                              <Separator className="my-2" />
                              <ul className="list-disc pl-5 space-y-1">
                                {log.changes.map((change, index) => (
                                  <li key={index} className="text-sm">{change}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="usage">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-base font-semibold mb-2">Basic Usage</h4>
                            <p className="text-sm mb-3">
                              Pull the image from our registry using the Docker CLI:
                            </p>
                            <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
                              <p className="text-sm font-mono overflow-x-auto whitespace-nowrap">
                                {image.usageInstructions}
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-base font-semibold mb-2">Dockerfile Example</h4>
                            <p className="text-sm mb-3">
                              Base your application's Dockerfile on this golden image:
                            </p>
                            <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
                              <pre className="text-sm font-mono overflow-x-auto">
{`FROM ${image.dockerHubUrl}

WORKDIR /app

# Copy application files
COPY . .

# Install dependencies
${image.languagePack === "Python" ? "RUN pip install -r requirements.txt" :
  image.languagePack === "Node.js" ? "RUN npm install" :
  image.languagePack === "Go" ? "RUN go mod download" :
  image.languagePack === "Java" ? "RUN ./mvnw package" :
  image.languagePack === ".NET" ? "RUN dotnet restore" :
  "# Install your dependencies here"}

# Set the entrypoint
${image.languagePack === "Python" ? 'CMD ["python", "app.py"]' :
  image.languagePack === "Node.js" ? 'CMD ["node", "index.js"]' :
  image.languagePack === "Go" ? 'CMD ["./app"]' :
  image.languagePack === "Java" ? 'CMD ["java", "-jar", "app.jar"]' :
  image.languagePack === ".NET" ? 'CMD ["dotnet", "run"]' :
  '# Add your entrypoint command here'}`}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="docs">
                        <div className="space-y-4">
                          <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
                            <div className="flex">
                              <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                              <p className="text-sm text-blue-800">
                                For complete documentation on using this golden image, please refer to our internal 
                                documentation portal or contact the Enterprise Platform Team.
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-base font-semibold mb-2">
                              Included Packages & Libraries
                            </h4>
                            <p className="text-sm mb-3">
                              This image includes the following pre-installed components:
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                              <li>{image.baseOS} {image.osVersion} base packages</li>
                              <li>{image.languagePack} {image.languageVersion} runtime</li>
                              {image.languagePack === "Python" && (
                                <>
                                  <li>pip package manager</li>
                                  <li>Common data science libraries (numpy, pandas)</li>
                                </>
                              )}
                              {image.languagePack === "Node.js" && (
                                <>
                                  <li>npm package manager</li>
                                  <li>yarn package manager</li>
                                </>
                              )}
                              {image.languagePack === "Java" && (
                                <>
                                  <li>Maven build tool</li>
                                  <li>Common JVM utilities</li>
                                </>
                              )}
                              <li>Security patches and updates as of {formatDate(image.lastUpdated)}</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-base font-semibold mb-2">
                              Best Practices
                            </h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                              <li>Always use specific image tags rather than 'latest' for reproducible builds</li>
                              <li>Do not modify the base image layers; extend with your application code only</li>
                              <li>Check for newer golden image versions regularly to get security updates</li>
                              <li>Report any issues with the base image to the support channel</li>
                            </ul>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
              
              {/* Right Column - Support & Related */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <HelpCircle className="h-5 w-5 mr-2" />
                      Support Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Support Channel</h4>
                        <p className="mt-1">
                          <Badge variant="outline" className="font-normal">
                            {image.supportChannel.type}
                          </Badge>
                          <span className="ml-2">{image.supportChannel.contact}</span>
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Maintained By</h4>
                        <p className="mt-1">{image.maintainer}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Image Lifecycle</h4>
                        <div className="mt-1 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Support Status</span>
                            <Badge variant={daysUntilEOL < 90 ? "destructive" : "default"}>
                              {daysUntilEOL < 0 ? "End of Life" : daysUntilEOL < 90 ? "Approaching EOL" : "Supported"}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Security Updates</span>
                            <span className="text-sm font-medium">
                              Until {formatDate(image.eolDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="pt-2">
                        <h4 className="text-sm font-medium">Need Help?</h4>
                        <p className="mt-1 text-sm text-muted-foreground">
                          If you encounter any issues or have questions about using this golden image, 
                          please contact the support team via the channel above.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Related Images</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {goldenImages
                        .filter(img => img.id !== image.id && img.languagePack === image.languagePack)
                        .slice(0, 2)
                        .map(relatedImage => (
                        <Link key={relatedImage.id} to={`/image/${relatedImage.id}`} className="block">
                          <div className="flex items-start p-3 rounded-md hover:bg-slate-50 transition-colors">
                            <div className="flex-grow">
                              <div className="flex items-center">
                                <span className={`language-badge ${getLanguageBadgeClass(relatedImage.languagePack)}`}>
                                  {relatedImage.languagePack} {relatedImage.languageVersion}
                                </span>
                              </div>
                              <p className="mt-1 font-medium">{relatedImage.name}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1">{relatedImage.description}</p>
                            </div>
                            <ChevronLeft className="h-5 w-5 transform rotate-180 text-muted-foreground flex-shrink-0" />
                          </div>
                        </Link>
                      ))}
                      
                      {goldenImages
                        .filter(img => img.id !== image.id && img.baseOS === image.baseOS && img.languagePack !== image.languagePack)
                        .slice(0, 2)
                        .map(relatedImage => (
                        <Link key={relatedImage.id} to={`/image/${relatedImage.id}`} className="block">
                          <div className="flex items-start p-3 rounded-md hover:bg-slate-50 transition-colors">
                            <div className="flex-grow">
                              <div className="flex items-center">
                                <span className={`language-badge ${getLanguageBadgeClass(relatedImage.languagePack)}`}>
                                  {relatedImage.languagePack} {relatedImage.languageVersion}
                                </span>
                              </div>
                              <p className="mt-1 font-medium">{relatedImage.name}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1">{relatedImage.description}</p>
                            </div>
                            <ChevronLeft className="h-5 w-5 transform rotate-180 text-muted-foreground flex-shrink-0" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
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

export default ImageDetail;
