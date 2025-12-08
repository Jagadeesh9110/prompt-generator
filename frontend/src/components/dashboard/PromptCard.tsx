import React from 'react';
import type { Prompt } from '../../types/prompt';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
// I'll use a simple div for badge for now as Badge component is not in ui folder.
import { ThumbsUp, Copy, Share2 } from 'lucide-react';
import { Button } from '../ui/button';

interface PromptCardProps {
    prompt: Prompt;
    onCopy: (content: string) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onCopy }) => {
    return (
        <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-bold line-clamp-1">{prompt.title}</CardTitle>
                    <div className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                        {prompt.model}
                    </div>
                </div>
                <div className="text-xs text-muted-foreground">
                    by user-{prompt.userId.slice(0, 4)}
                </div>
            </CardHeader>
            <CardContent className="flex-1 pb-2">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {prompt.description}
                </p>
                <div className="flex flex-wrap gap-1">
                    {prompt.tags.map(tag => (
                        <span key={tag} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                            #{tag}
                        </span>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="pt-2 border-t flex justify-between">
                <div className="flex items-center text-muted-foreground text-sm space-x-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{prompt.likes}</span>
                </div>
                <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onCopy(prompt.content)}>
                        <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Share2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default PromptCard;
