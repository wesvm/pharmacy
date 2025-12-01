import { apiRequest } from "./api-service";

export const chatMessage = async (message: string): Promise<{ reply: string }> => {
  return apiRequest<{ reply: string }>('/chat/message', {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
};