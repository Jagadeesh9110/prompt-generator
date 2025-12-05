import mongoose, { Document, Schema } from 'mongoose';

export interface IPromptAdaptation extends Document {
    templateId: string;
    userContext: string;
    injectedVariables: Record<string, any>;
    basePrompt: string;
    createdAt: Date;
}

const PromptAdaptationSchema: Schema = new Schema({
    templateId: { type: String, required: true },
    userContext: { type: String, required: true },
    injectedVariables: { type: Schema.Types.Mixed, required: true },
    basePrompt: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IPromptAdaptation>('PromptAdaptation', PromptAdaptationSchema);
