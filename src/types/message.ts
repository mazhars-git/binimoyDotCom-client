export type TMessage ={
    _id: string;
    senderId: {
      _id: string;
      name: string;
      email: string;
      phoneNumber: string;
      role: 'user' | 'admin' | 'superAdmin'; 
      isBan: boolean;
    };
    receiverId: {
      _id: string;
      name: string;
      email: string;
      phoneNumber: string;
      role: 'user' | 'admin' | 'superAdmin';
      isBan: boolean;
    };
    message: string;
    createdAt: string;
    updatedAt: string;
  }