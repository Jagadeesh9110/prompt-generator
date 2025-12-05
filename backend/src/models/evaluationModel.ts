import mongoose, { Document, Schema } from 'mongoose';

export interface IEvaluation extends Document {
    prompt: string;
    score: number;
    issuesFound: string[];
    improvedPrompt: string;
    createdAt: Date;
}

const EvaluationSchema: Schema = new Schema({
    prompt: { type: String, required: true },
    score: { type: Number, required: true, min: 0, max: 10 },
    issuesFound: [{ type: String }],
    improvedPrompt: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IEvaluation>('Evaluation', EvaluationSchema);
