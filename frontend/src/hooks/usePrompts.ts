import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getPrompts,
    getCategories,
    createPrompt,
    getRecentPrompts
} from '../api/prompts';
import type { CreatePromptRequest } from '../types/prompt';

export const usePrompts = (categoryId?: string, subcaseId?: string) => {
    return useQuery({
        queryKey: ['prompts', categoryId, subcaseId],
        queryFn: () => getPrompts(categoryId, subcaseId),
    });
};

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });
};

export const useRecentPrompts = () => {
    return useQuery({
        queryKey: ['recent-prompts'],
        queryFn: getRecentPrompts,
    });
};

export const useCreatePrompt = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreatePromptRequest) => createPrompt(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['prompts'] });
            queryClient.invalidateQueries({ queryKey: ['recent-prompts'] });
        },
    });
};
