import Image from "next/image";

type ConversationProps = {
  image: string;
  name: string;
  content: string;
};

export function Conversation({ name, image, content }: ConversationProps) {
  return (
    <div className="border-r-1">
      <div className="flex p-4 first:border-t-1 last:border-b-1 gap-4 items-center">
        <Image
          src={image}
          alt="Avatar"
          width={30}
          height={30}
          className="rounded-full object-cover"
          style={{ width: "50px", height: "50px" }}
        />

        <div>
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <p className="text-xs text-gray-600">{content}</p>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
