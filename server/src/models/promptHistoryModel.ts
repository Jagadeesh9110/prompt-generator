import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './userModel';

export interface IPromptHistory extends Document {
    user: IUser['_id'];
    originalIntent: string;
    compiledPrompts: any;
    createdAt: Date;
}

const promptHistorySchema: Schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    originalIntent: {
        type: String,
        required: true,
    },
    compiledPrompts: {
        type: Schema.Types.Mixed,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model<IPromptHistory>('PromptHistory', promptHistorySchema);
