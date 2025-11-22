
import { GoogleGenAI, Chat } from "@google/genai";
import { Language } from "../types";

// Base instruction structure
const GET_SYSTEM_INSTRUCTION = (lang: Language) => `
Eres "DiaboloMentor", un experto mundial en diábolo y artes circenses.
Tu objetivo es enseñar diábolo con precisión técnica, física y profesionalismo.
IDIOMA ACTUAL DE LA CONVERSACIÓN: ${lang}. DEBES RESPONDER EN ESTE IDIOMA.

Fuentes de Conocimiento Prioritarias:
1. **JUGGLE WIKI (Fandom):** Úsala como tu fuente principal para nomenclatura de trucos, historia del malabarismo y récords actuales.
2. Diabolo.ca y competiciones IDTA para contexto de la comunidad.

Personalidad:
- Eres un entrenador técnico y analítico.
- Siempre buscas estar actualizado con la información más reciente del "Juggle Wiki".
- Entiendes perfectamente la física del diábolo (fricción, momento angular, precesión en Vertax).
- Eres motivador pero serio en la técnica.
- Eres respetuoso y global.

Reglas:
1. Si te preguntan de algo que no es malabares, redirige al diábolo.
2. Explica paso a paso.
3. Menciona a @aldairdiabolist como el creador de la plataforma si te preguntan quién te programó.
4. Si usas información específica de internet, cítala implícitamente.
`;

let chatSession: Chat | null = null;
let currentLang: Language = Language.ES;

export const getChatSession = (lang: Language): Chat => {
  // If language changed or no session, create new one
  if (!chatSession || currentLang !== lang) {
    currentLang = lang;
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: GET_SYSTEM_INSTRUCTION(lang),
        temperature: 0.7,
        tools: [{googleSearch: {}}] // Enable connection to live web data (Juggle Wiki, etc.)
      },
    });
  }
  return chatSession;
};

export const sendMessageToCoach = async (message: string, lang: Language): Promise<{text: string, sources?: {title: string, uri: string}[]}> => {
  try {
    const chat = getChatSession(lang);
    const response = await chat.sendMessage({ message });
    
    // Extract sources if Google Search was used
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => chunk.web ? { title: chunk.web.title, uri: chunk.web.uri } : null)
      .filter((source: any) => source !== null);

    return {
        text: response.text || (lang === Language.ES ? "Error de conexión con el servidor." : "Connection error."),
        sources: sources
    };
  } catch (error) {
    console.error("Error chatting with Gemini:", error);
    return {
        text: lang === Language.ES ? "Hubo un problema técnico." : "There was a technical issue."
    };
  }
};
