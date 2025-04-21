"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { sendMessage } from "@/services/Messages";
import { TMessage } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

export const ConversationBetweenUser = ({
  messages,
  currentUserId,
}: {
  messages: TMessage[];
  currentUserId: string;
}) => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
    
  if (!messages || messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No messages yet</p>
       
      </div>
    );
  }
  

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const lastMessage = messages[messages.length - 1];
      const receiverId =
        lastMessage.senderId._id === currentUserId
          ? lastMessage.receiverId._id
          : lastMessage.senderId._id;

      const result = await sendMessage({
        senderId: currentUserId,
        receiverId,
        message: data.message,
      });

      if (result?.success) {
        toast.success("Message sent");
        form.reset();
      } else {
        toast.error(result?.message || "Failed to send message");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-w-3xl mx-auto border rounded-lg overflow-hidden">
      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${
              message.senderId._id === currentUserId
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                message.senderId._id === currentUserId
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <div className="font-medium text-sm">
                {message.senderId._id === currentUserId
                  ? "You"
                  : message.senderId.name}
              </div>
              <p className="my-1">{message.message}</p>
              <div className="text-xs text-muted-foreground text-right">
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t p-4">
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
          <Textarea
            {...form.register("message")}
            placeholder="Type your message here..."
            className="flex-1"
            disabled={isSubmitting}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send"}
          </Button>
        </form>
        {form.formState.errors.message && (
          <p className="text-sm text-destructive mt-1">
            {form.formState.errors.message.message}
          </p>
        )}
      </div>
    </div>
  );
};
