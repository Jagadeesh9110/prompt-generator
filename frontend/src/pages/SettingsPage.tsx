import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants } from '../animations/cardMotion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

const SettingsPage: React.FC = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Manage your account settings and preferences.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Settings configuration coming soon.</p>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default SettingsPage;
