export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    subcases?: Subcase[];
}

export interface Subcase {
    id: string;
    name: string;
    slug: string;
    categoryId: string;
    description?: string;
}

export interface Prompt {
    id: string;
    title: string;
    content: string;
    description: string;
    categoryId: string;
    subcaseId?: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    userId: string;
    isPublic: boolean;
    likes: number;
    model: string; // e.g., 'gpt-4', 'claude-3'
}

export interface CreatePromptRequest {
    title: string;
    content: string;
    description?: string;
    categoryId: string;
    subcaseId?: string;
    tags?: string[];
    model?: string;
    isPublic?: boolean;
}
