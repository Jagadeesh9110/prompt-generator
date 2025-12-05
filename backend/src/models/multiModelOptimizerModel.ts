import mongoose, { Document, Schema } from 'mongoose';

export interface IMultiModelOptimizer extends Document {
    basePrompt: string;
    category: string;
    subcase: string;
    optimized: {
        chatgpt: string;
        claude: string;
        gemini: string;
        llama: string;
        perplexity: string;
        grok_regular: string;
        grok_fun: string;
    };
    createdAt: Date;
}

const MultiModelOptimizerSchema: Schema = new Schema({
    basePrompt: { type: String, required: true },
    category: { type: String, required: true },
    subcase: { type: String, required: true },
    optimized: {
        chatgpt: { type: String, required: true },
        claude: { type: String, required: true },
        gemini: { type: String, required: true },
        llama: { type: String, required: true },
        perplexity: { type: String, required: true },
        grok_regular: { type: String, required: true },
        grok_fun: { type: String, required: true },
    },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IMultiModelOptimizer>('MultiModelOptimizer', MultiModelOptimizerSchema);
