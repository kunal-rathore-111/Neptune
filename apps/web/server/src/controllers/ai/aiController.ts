import type { Request, Response } from 'express';
import AppError from '../../middlewares/appError';
import { AI_Server_URL } from '../../utils/envVariables';
import { formatAndCleanUrl } from '@repo/libs';
import axios from 'axios';
import { db } from '../../config/dbDrizzle';
import { findEmbeddingService } from '../../services/content/embeddingService';


const magicFill = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;

    if (!url) throw new AppError('URL not found', 404, 'Not found');
    if (!url.includes('.')) {
      throw new AppError('Invalid URL', 400, 'BadRequest');
    }

    const cleanURL = formatAndCleanUrl(url);

    const aiServerNetworkResponse = await fetch(AI_Server_URL + '/magic-fill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: cleanURL }),
    });

    // 3. Parse the JSON response from Hono
    const aiResponse = await aiServerNetworkResponse.json();

    if (!aiServerNetworkResponse.ok || aiResponse.type === 'error') {
      if (aiServerNetworkResponse.status === 400) {
        throw new AppError(aiResponse.message ?? 'Internal server error', 400, 'BadRequest');
      }
      throw new AppError('Internal Server Error', 500, 'ServerError');
    }

    return res.status(200).json({
      message: 'Successfully generated AI metadata',
      data: aiResponse.message,
      success: true,
    });
  } catch (error) {
    console.error("magic fill  Error----- ", error)
    throw new AppError("Something went wrong", 500, "magicFillError")
  }
};


const globalChat = async (req: Request, res: Response) => {

  // data fetch using embeddings of the query then give to ai and ai give response send to user
  try {

    const query = req.userQuery;
    const chatHistory = req.chatHistory;
    //  console.error(`\n\nHistory- ${chatHistory} \n\n`)
    const userId = req.userId;
    //generatign embeddings
    const generateEmbeddingsforQuery = await axios(AI_Server_URL + '/embedding/generate-for-query', {
      method: "POST",
      data: { query, chatHistory }
    })
    //console.error(generateEmbeddingsforQuery.data);
    if (generateEmbeddingsforQuery.status === 200) {

      console.log("Vector for embeddingGeneratorForQuery generated now finding relevant data and sending to chatbot model")

      const embeddingVector: number[] = generateEmbeddingsforQuery.data.embeddingVector;
      // query on db give to aiserver
      const result = await findEmbeddingService(embeddingVector, userId);


      const aiServerChatResponse = await axios(AI_Server_URL + '/chat', {
        data: { userQuery: query, contentData: result, chatHistory: chatHistory },
        method: "POST"
      })
      if (aiServerChatResponse.data.type && aiServerChatResponse.data.type === "success") {
        return res.status(200).json({
          message: aiServerChatResponse.data.message,
          type: "success",
        })
      }
      else {
        return res.status(aiServerChatResponse.status).json({
          type: "error",
          message: aiServerChatResponse.data.message
        })
      }

    }
    else {
      return res.status(generateEmbeddingsforQuery.status).json({
        type: "error",
        message: generateEmbeddingsforQuery.data.message
      })
    }

    // i can even throw the above both else statements but ok it will be fast instead throwing
  } catch (error) {
    console.error("globalChat Error----- ", error)
    throw new AppError("Something went wrong", 500, "globalChatError")
  }


}

export default { magicFill, globalChat };
