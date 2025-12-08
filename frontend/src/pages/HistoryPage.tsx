import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants } from '../animations/cardMotion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

const HistoryPage: React.FC = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Prompt History</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Generations</CardTitle>
                    <CardDescription>View your past prompt activities and results.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">No history available yet.</p>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default HistoryPage;
