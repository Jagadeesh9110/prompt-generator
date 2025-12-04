import mongoose, { Document, Schema } from 'mongoose';

export interface IIntent extends Document {
    text: string;
    category: string;
    subcase: string;
    modelType: string;
    flags: {
        isJson: boolean;
        isMultimodal: boolean;
        isSearch: boolean;
    };
    metadata?: any;
    createdAt: Date;
}

const IntentSchema: Schema = new Schema({
    text: { type: String, required: true },
    category: { type: String, required: true },
    subcase: { type: String, required: true },
    modelType: { type: String, required: true },
    flags: {
        isJson: { type: Boolean, default: false },
        isMultimodal: { type: Boolean, default: false },
        isSearch: { type: Boolean, default: false },
    },
    metadata: { type: Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IIntent>('Intent', IntentSchema);
