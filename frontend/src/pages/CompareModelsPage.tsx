import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants } from '../animations/cardMotion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

const CompareModelsPage: React.FC = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Model Comparison</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Compare Outputs</CardTitle>
                    <CardDescription>Test prompts across multiple LLMs side-by-side.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Comparison tool coming soon.</p>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default CompareModelsPage;
