import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface TaskModel{
    id?: string;
    title: string;
    description: string;
    dueDate?: FirebaseFirestoreTypes.Timestamp;
    start?: FirebaseFirestoreTypes.Timestamp;
    end?: FirebaseFirestoreTypes.Timestamp;
    uids: string[];
    color?: string;
    attachments: Attachment[];
    progress?: number;
    isUrgent: boolean
    createdAt: number;
    updatedAt: number;
}

export interface Attachment {
    name: string;
    url: string;
    size: number;
    type?: string
}

export interface Subtask {
    createdAt: number
    description: string
    id: string
    isComplete: boolean
    taskId: string
    title: string
    updatedAt: number
  }
