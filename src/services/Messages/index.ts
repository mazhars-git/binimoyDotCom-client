"use server";

import { cookies } from "next/headers";

export const sendMessage = async (text: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_API}/message`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(text),
      }
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    return new Error(error);
  }
};


export const getConversation = async (userId: string, otherUserId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_API}/message/${userId}/${otherUserId}`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: { tags: ['messages'] } // For revalidation
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return [];
  }
};
  



export const receiveMessage = async (senderId: string, receiverId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_API}/message/${senderId}/${receiverId}`,
      {
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Ensure we always return an array
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching messages:", error);
    return []; // Return empty array on error
  }
};
