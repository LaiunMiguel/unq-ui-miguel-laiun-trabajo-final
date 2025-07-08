import axios from './axiosConfig';

export const getDifficulties = async () => {
  try {
    const response = await axios.get('/difficulties');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getGameSession = async (id) => {
  try {
    const response = await axios.get(`/difficulties/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const checkWord = async (sessionId, word) => {
  if (!sessionId || !word) {
    console.error("Faltan parámetros para checkWord:", { sessionId, word });
    return { error: "Parámetros inválidos" };
  }
  try {
    const body = {
      sessionId: sessionId,
      word: word
    };
    const response = await axios.post('/checkWord', body);
    return response.data;
  } catch (error) {
    if(error.isAxiosError) {
      if (error.message === "Network Error") {
        return { error: "La palabra no existe en el diccionario" };
      }  
      else {
        return { error: "Error inesperado del servidor" };
      }
    }
    console.error("Otro error", error);
    return { error: "Error al verificar la palabra" };
  }
};