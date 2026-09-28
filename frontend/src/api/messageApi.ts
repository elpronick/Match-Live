import apiClient from './client';

export interface ChatMessage {
  id: string | number;
  senderId?: string;
  receiverId?: string;
  roomId?: string | null;
  text: string;
  sender?: 'me' | 'partner';
  senderName?: string;
  isSender?: boolean;
  time: string;
}

export interface RawApiMessage {
  id: string | number;
  senderId?: string;
  receiverId?: string;
  roomId?: string | null;
  text: string;
  isSender?: boolean;
  senderName?: string;
  time: string;
}

export interface PartnerProfile {
  city?: string;
  budget?: number;
  lifestyle?: string;
  description?: string;
  avatarUrl?: string;
  age?: number;
}

export interface RoomItem {
  id: string;
  title: string;
  price: number | string;
  location: string;
  imageUrl?: string;
  image?: string;
  description?: string;
}

export interface PartnerUser {
  id: string;
  name: string;
  email?: string;
  image?: string;
  profile?: PartnerProfile;
  rooms?: RoomItem[];
}

export interface MatchItem {
  matchId: string;
  createdAt: string;
  partner: PartnerUser;
}

export async function getConversation(partnerId: string, roomId?: string | null): Promise<ChatMessage[]> {
  const query = roomId ? `?roomId=${roomId}` : '';
  const { data } = await apiClient.get<RawApiMessage[]>(`/api/messages/${partnerId}${query}`);
  return data.map((msg) => ({
    id: msg.id,
    senderId: msg.senderId,
    receiverId: msg.receiverId,
    roomId: msg.roomId,
    text: msg.text,
    sender: msg.isSender ? 'me' : 'partner',
    senderName: msg.senderName,
    time: msg.time,
  }));
}

export async function postMessage(receiverId: string, content: string, roomId?: string | null): Promise<ChatMessage> {
  const { data } = await apiClient.post<RawApiMessage>('/api/messages', {
    receiverId,
    content,
    roomId: roomId || null,
  });
  return {
    id: data.id,
    senderId: data.senderId,
    receiverId: data.receiverId,
    roomId: data.roomId,
    text: data.text,
    sender: 'me',
    senderName: data.senderName,
    time: data.time,
  };
}

export async function getMatches(): Promise<MatchItem[]> {
  const { data } = await apiClient.get<MatchItem[]>('/api/matches');
  return data;
}
