import { z } from "zod";

// Admin schema validation
export const adminSchema = z.object({
  password: z.string().min(6).max(50)
});

// Admin credentials (obfuscated)
export const ADMIN_PATH = btoa('admin1516');
export const ADMIN_PASS = btoa('Zaq123...');

export interface Deed {
  id: string;
  numericId: number;
  title: string;
  description: string;
  author: string;
  isAnonymous: boolean;
  date: string;
  time: string;
  location: string;
  category: string;
  likes: number;
  dislikes: number;
  image?: string;
  slug: string;
}

export interface DeedVote {
  deedId: string;
  type: 'like' | 'dislike';
  sessionId: string;
}

export interface UserActivity {
  id: string;
  timestamp: string;
  path: string;
  userAgent: string;
  deviceModel: string;
  deviceType: string;
  networkType: string;
  location?: string;
  sessionId: string;
  relatedDeedId?: string;
  connection?: {
    downlink: number;
    effectiveType: string;
    rtt: number;
  };
}