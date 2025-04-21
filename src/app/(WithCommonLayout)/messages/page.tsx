// app/messages/page.tsx
import { ConversationBetweenUser } from "@/components/modules/message";
import { getCurrentUser } from "@/services/AuthService";
import { receiveMessage } from "@/services/Messages";

const ConversationPage = async ({ params }: { params: { userId: string } }) => {
  try {
    const user = await getCurrentUser();
    console.log("Current user:", user); // Debug log
    
    const userMessage = await receiveMessage(user._id, params.userId);
    console.log("Received messages:", userMessage); // Debug log
    
    if (!Array.isArray(userMessage)) {
      console.error("Messages data is not an array:", userMessage);
      return <div>No messages found or error loading conversation</div>;
    }

    return (
      <div className="container mx-auto p-4">
        <ConversationBetweenUser
          messages={userMessage} 
          currentUserId={user._id} 
        />
      </div>
    );
  } catch (error) {
    console.error("Error in ConversationPage:", error);
    return <div>Error loading conversation</div>;
  }
};

export default ConversationPage;