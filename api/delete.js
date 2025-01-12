import prisma from "../api/lib/prisma.js";


const deleteChat = async (chatId) => {
  try {
    const deletedChat = await prisma.chat.delete({
      where: {
        id: chatId, // The ID of the chat to delete
      },
    });
    console.log('Deleted Chat:', deletedChat);
    return deletedChat;
  } catch (error) {
    console.error('Error deleting chat:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

// Usage
const chatId = '6747158ec9bab0fe38c0f90c'; // Replace with the actual chat ID
deleteChat(chatId)
  .then((result) => console.log('Chat successfully deleted.'))
  .catch((err) => console.error('Error:', err));
