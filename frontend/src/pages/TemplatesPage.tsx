import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants } from '../animations/cardMotion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

const TemplatesPage: React.FC = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Template Library</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>My Templates</CardTitle>
                    <CardDescription>Manage your reusable prompt templates here.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">No templates found. Start by saving a prompt as a template.</p>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default TemplatesPage;
