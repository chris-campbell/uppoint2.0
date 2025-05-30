import { useEffect, useState } from "react";
import Conversation from "./ui/Conversation";
import { Input } from "./ui/input";

const ConversationsList = () => {
  type Convo = {
    id: string;
    content: string;
    senderId: string;
    recipientId: string;
    sender: {
      id: string;
      name: string;
    };
    recipient: {
      id: string;
      name: string;
      image: string;
    };
    createdAt: string;
  };

  const [convos, setConvos] = useState<Convo[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      const res = await fetch("/api/conversations");
      const uniqueConvos = await res.json();
      setConvos(uniqueConvos);
    };

    getConversations();
  }, []);

  return (
    <div>
      <Input className="my-4" placeholder="Search Members..." />
      <div>
        {convos.map((convo) => (
          <Conversation
            key={convo.recipientId}
            name={convo.recipient.name}
            image={convo.recipient.image}
            content={convo.content}
          />
        ))}
      </div>
    </div>
  );
};

export default ConversationsList;
