import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    PlusCircle,
    FileText,
    History,
    Zap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { containerVariants, cardVariants } from '../animations/cardMotion';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();

    const features = [
        {
            title: 'Create Prompt',
            description: 'Design, optimize, and evaluate prompts for multiple models.',
            icon: PlusCircle,
            path: '/prompt/create',
            color: 'text-blue-500',
        },
        {
            title: 'Template Library',
            description: 'Browse and manage your collection of reusable prompt templates.',
            icon: FileText,
            path: '/templates',
            color: 'text-green-500',
        },
        {
            title: 'Prompt History',
            description: 'View past generations, optimizations, and evaluation scores.',
            icon: History,
            path: '/history',
            color: 'text-orange-500',
        },
        {
            title: 'Model Comparison',
            description: 'Compare outputs across ChatGPT, Claude, Gemini, and more.',
            icon: Zap,
            path: '/compare',
            color: 'text-purple-500',
        },
    ];

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4"
        >
            {features.map((feature) => (
                <motion.div
                    key={feature.title}
                    variants={cardVariants}
                    whileHover="hover"
                    onClick={() => navigate(feature.path)}
                    className="cursor-pointer"
                >
                    <Card className="h-full border-2 border-transparent hover:border-primary/20 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {feature.title}
                            </CardTitle>
                            <feature.icon className={`h-4 w-4 ${feature.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{/* Placeholder for stats */}</div>
                            <CardDescription className="mt-2">
                                {feature.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default DashboardPage;
