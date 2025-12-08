import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCategories } from '../../hooks/usePrompts';
import { Button } from '../ui/button';
import { cn } from '../../utils/cn';

interface CategorySelectorProps {
    selectedCategoryId?: string;
    onSelectCategory: (categoryId: string | undefined) => void;
    selectedSubcaseId?: string;
    onSelectSubcase: (subcaseId: string | undefined) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
    selectedCategoryId,
    onSelectCategory,
    selectedSubcaseId,
    onSelectSubcase
}) => {
    const { data: categories, isLoading } = useCategories();

    const selectedCategory = categories?.find(c => c.id === selectedCategoryId);

    if (isLoading) {
        return <div className="h-12 w-full animate-pulse bg-muted rounded-md" />;
    }

    if (!categories || categories.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
                <Button
                    variant={selectedCategoryId === undefined ? "default" : "outline"}
                    onClick={() => {
                        onSelectCategory(undefined);
                        onSelectSubcase(undefined);
                    }}
                    className="rounded-full"
                >
                    All
                </Button>
                {categories.map((category) => (
                    <Button
                        key={category.id}
                        variant={selectedCategoryId === category.id ? "default" : "outline"}
                        onClick={() => {
                            if (selectedCategoryId === category.id) {
                                onSelectCategory(undefined);
                            } else {
                                onSelectCategory(category.id);
                            }
                            onSelectSubcase(undefined);
                        }}
                        className="rounded-full"
                    >
                        {category.name}
                    </Button>
                ))}
            </div>

            {/* Subcases - Animated */}
            <AnimatePresence>
                {selectedCategory && selectedCategory.subcases && selectedCategory.subcases.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-wrap gap-2 py-2">
                            {selectedCategory.subcases.map((subcase) => (
                                <button
                                    key={subcase.id}
                                    onClick={() => onSelectSubcase(selectedSubcaseId === subcase.id ? undefined : subcase.id)}
                                    className={cn(
                                        "px-3 py-1 text-sm rounded-full transition-colors border",
                                        selectedSubcaseId === subcase.id
                                            ? "bg-secondary text-secondary-foreground border-transparent"
                                            : "bg-transparent text-muted-foreground border-border hover:border-foreground/20"
                                    )}
                                >
                                    {subcase.name}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CategorySelector;
