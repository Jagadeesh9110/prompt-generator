import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    PlusCircle,
    FileText,
    History,
    Zap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { containerVariants, cardVariants } from '../animations/cardMotion';
import CategorySelector from '../components/dashboard/CategorySelector';
import PromptCard from '../components/dashboard/PromptCard';
import { usePrompts } from '../hooks/usePrompts';
import type { Prompt } from '../types/prompt';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
    const [selectedSubcaseId, setSelectedSubcaseId] = useState<string | undefined>(undefined);

    const { data: prompts, isLoading: isPromptsLoading } = usePrompts(selectedCategoryId, selectedSubcaseId);

    const handleCopy = (content: string) => {
        navigator.clipboard.writeText(content);
        // Toast notification would go here
    };

    const features = [
        {
            title: 'Create Prompt',
            description: 'Design, optimize, and evaluate prompts.',
            icon: PlusCircle,
            path: '/prompt/create',
            color: 'text-blue-500',
        },
        {
            title: 'Template Library',
            description: 'Browse reusable prompt templates.',
            icon: FileText,
            path: '/templates',
            color: 'text-green-500',
        },
        {
            title: 'Prompt History',
            description: 'View past generations.',
            icon: History,
            path: '/history',
            color: 'text-orange-500',
        },
        {
            title: 'Compare Models',
            description: 'ChatGPT vs Claude vs Gemini.',
            icon: Zap,
            path: '/compare',
            color: 'text-purple-500',
        },
    ];

    return (
        <div className="space-y-8">
            {/* Quick Actions */}
            <section>
                <h2 className="text-2xl font-bold tracking-tight mb-4">Quick Actions</h2>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={cardVariants}
                            whileHover="hover"
                            onClick={() => navigate(feature.path)}
                            className="cursor-pointer"
                        >
                            <Card className="h-full hover:bg-muted/50 transition-colors">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {feature.title}
                                    </CardTitle>
                                    <feature.icon className={`h-4 w-4 ${feature.color}`} />
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Browse Prompts */}
            <section className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Browse Prompts</h2>
                    <p className="text-muted-foreground">Discover community prompts and templates.</p>
                </div>

                <CategorySelector
                    selectedCategoryId={selectedCategoryId}
                    onSelectCategory={setSelectedCategoryId}
                    selectedSubcaseId={selectedSubcaseId}
                    onSelectSubcase={setSelectedSubcaseId}
                />

                <div className="min-h-[200px]">
                    {isPromptsLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Loading Skeletons */}
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-48 rounded-lg bg-muted animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        prompts && prompts.length > 0 ? (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {prompts.map((prompt: Prompt) => (
                                    <motion.div key={prompt.id} variants={cardVariants}>
                                        <PromptCard prompt={prompt} onCopy={handleCopy} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                                No prompts found in this category.
                            </div>
                        )
                    )}
                </div>
            </section>
        </div>
    );
};

export default DashboardPage;
