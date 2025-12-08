import client from './client';
import type { Prompt, Category, CreatePromptRequest } from '../types/prompt';

export const getPrompts = async (categoryId?: string, subcaseId?: string): Promise<Prompt[]> => {
    const params = new URLSearchParams();
    if (categoryId) params.append('categoryId', categoryId);
    if (subcaseId) params.append('subcaseId', subcaseId);

    const response = await client.get<Prompt[]>('/prompts', { params });
    return response.data;
};

export const getPromptById = async (id: string): Promise<Prompt> => {
    const response = await client.get<Prompt>(`/prompts/${id}`);
    return response.data;
};

export const createPrompt = async (data: CreatePromptRequest): Promise<Prompt> => {
    const response = await client.post<Prompt>('/prompts', data);
    return response.data;
};

export const getCategories = async (): Promise<Category[]> => {
    // Assuming categories endpoint exists
    const response = await client.get<Category[]>('/categories');
    return response.data;
};

export const getRecentPrompts = async (): Promise<Prompt[]> => {
    const response = await client.get<Prompt[]>('/prompts/recent');
    return response.data;
};
