import type { Variants } from 'framer-motion';

export const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' }
    },
    hover: {
        y: -5,
        scale: 1.02,
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.2)',
        transition: { duration: 0.2 }
    }
};

export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};
