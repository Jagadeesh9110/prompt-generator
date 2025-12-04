import mongoose, { Document, Schema } from 'mongoose';

export interface ITemplate extends Document {
    name: string;
    category: string;
    subcase: string;
    templateText: string;
    syntaxProfile: 'generic' | 'json' | 'xml' | 'reasoning' | 'multimodal' | 'llama';
    variables: string[];
    version: number;
    createdAt: Date;
}

const TemplateSchema: Schema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    subcase: { type: String, required: true },
    templateText: { type: String, required: true },
    syntaxProfile: {
        type: String,
        enum: ['generic', 'json', 'xml', 'reasoning', 'multimodal', 'llama'],
        required: true,
    },
    variables: [{ type: String }],
    version: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now },
});

// Compound index for efficient lookup
TemplateSchema.index({ category: 1, subcase: 1 });

export default mongoose.model<ITemplate>('Template', TemplateSchema);
