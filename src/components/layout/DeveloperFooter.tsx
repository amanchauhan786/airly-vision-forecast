
import React from 'react';
import { Mail, ExternalLink, Linkedin, Github, Sprout } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const DeveloperFooter = () => {
  return (
    <Card className="mt-8 bg-muted/50">
      <CardContent className="p-4">
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Sprout className="h-4 w-4" />
            <span>Created by Aman Chauhan</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <a 
              href="mailto:aman.chauhan2022@vitstudent.ac.in"
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-3 w-3" />
              <span>aman.chauhan2022@vitstudent.ac.in</span>
            </a>
            
            <a 
              href="https://amanch.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              <span>Portfolio</span>
            </a>
            
            <a 
              href="https://linkedin.com/in/aman-chauhan-128552256"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-3 w-3" />
              <span>LinkedIn</span>
            </a>
            
            <a 
              href="https://github.com/amanchauhan786"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-3 w-3" />
              <span>GitHub</span>
            </a>
            
            <a 
              href="https://www.linkedin.com/company/cropskyofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <Sprout className="h-3 w-3" />
              <span>Cropsky</span>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeveloperFooter;
