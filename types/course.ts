export interface Course {
    id: number;
    title: string;
    description: string;
    category: 'english' | 'math' | 'science' | 'coding';
    level: 'beginner' | 'intermediate' | 'advanced';
    price: number;
    thumbnail?: string;
    instructorId: number;
    createdAt: string;
    updatedAt: string;
}