import { getEmbedding } from './utils/embed.js';
import { getChatResponse ,splitDocument} from './utils/chat.js';
import supabase from './utils/supabaseclient.js';
import movies from './content.js';
export async function runRAGPipeline(query)
{


const query_embedding = await getEmbedding(query);
/*const paired = await Promise.all(
    movies.map(text => getEmbedding(text))
  );*/
//console.log(paired);


async function createAndStoreEmbeddings() {
  const chunkData = await splitDocument(movies);
  const data = await Promise.all(
    chunkData.map(async (chunk) => {
      const embeddingResponse=await getEmbedding(chunk.pageContent);
      
      
      return { 
        content: chunk.pageContent, 
        embedding: embeddingResponse.embedding 
      };
    })
  );
  await supabase.from('documents').insert(data);
  console.log('SUCCESS!');
}

async function findNearestMatch(embedding) {
  const { data } = await supabase.rpc('match_documents', {
    query_embedding: embedding,
    match_threshold: 0.2,
    match_count: 1
  });
  console.log(data);
  return data[0];
  
}



const match=await findNearestMatch(query_embedding.embedding);

const messages = [
  {
    role: "system",
    content:
      `You are an enthusiastic movie expert who loves recommending movies to people. You will be given two pieces of information - some context about movies and a question. Your main job is to formulate a short answer to the question using the provided context. If the answer is not given in the context, find the answer in the conversation history if possible. If you are unsure and cannot find the answer in the context, say, "Sorry, I don't know the answer." Please do not make up the answer.` ,
  },
  {
    role: "user",
    content: `Context: ${match.content}\nQuestion: ${query}`,
  },
];

const reply = await getChatResponse(messages);
messages.push({
  role: "assistant",
  content: reply,
});
 

console.log("🧠 AI says:", reply);
return reply;
}