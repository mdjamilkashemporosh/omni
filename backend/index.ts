import express, { type Request, type Response } from 'express';
import { ChatOllama } from '@langchain/ollama';
import { HumanMessage } from '@langchain/core/messages';
import cors from 'cors';
import { config } from './config/config';
import type { ChatHandlerError, ChatRequest } from './types';

const app = express();

app.use(express.json());
app.use(cors());

const model = new ChatOllama({
  baseUrl: config.baseUrl,
  model: config.model,
  streaming: true,
});

app.post('/chat', async (req: Request<{}, {}, ChatRequest>, res: Response): Promise<void> => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
    const errorResponse: ChatHandlerError = { error: 'Prompt is required' };
    res.status(400).json(errorResponse);
    return;
  }

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');

  try {
    const stream = await model.stream([new HumanMessage(prompt)]);

    for await (const chunk of stream) {
      if (chunk.content) {
        res.write(chunk.content);
      }
    }

    res.end();
  } catch (error: unknown) {
    console.error('Streaming error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Streaming failed' });
    } else {
      res.end();
    }
  }
});

app.listen(config.port, () => {
  console.log(`🚀 App listening at http://localhost:${config.port}`);
});