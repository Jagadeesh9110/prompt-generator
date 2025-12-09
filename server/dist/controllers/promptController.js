"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = void 0;
const promptCompiler_1 = require("../services/promptCompiler");
const compile = async (req, res) => {
    try {
        const { intent, category } = req.body;
        if (!intent) {
            return res.status(400).json({ error: 'Intent is required' });
        }
        const result = await (0, promptCompiler_1.compilePrompt)(intent, category || 'General');
        res.json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.compile = compile;
