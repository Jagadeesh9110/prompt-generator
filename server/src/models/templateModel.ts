import mongoose, { Document, Schema } from 'mongoose';

export interface ITemplate extends Document {
    title: string;
    category: 'Development' | 'Reasoning' | 'Writing' | 'Productivity' | 'Social' | 'Other';
    subcase: string;
    templateText: string;
    variables: string[];
    modelPreferences?: Map<string, any>;
}

const templateSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Development', 'Reasoning', 'Writing', 'Productivity', 'Social', 'Other'],
    },
    subcase: {
        type: String,
        required: true,
        trim: true,
    },
    templateText: {
        type: String,
        required: true,
    },
    variables: {
        type: [String],
        default: [],
    },
    modelPreferences: {
        type: Map,
        of: Schema.Types.Mixed,
        default: {},
    },
});

export default mongoose.model<ITemplate>('Template', templateSchema);
