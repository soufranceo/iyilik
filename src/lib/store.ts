import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Deed, DeedVote, UserActivity } from './types';
import { generateSlug } from './utils';
import { sampleDeeds } from './data';

let currentNumericId = Math.max(...sampleDeeds.map(d => d.numericId || 0), 0) + 1;

interface StoreState {
  deeds: Deed[];
  votes: DeedVote[];
  activities: UserActivity[];
  addDeed: (deed: Omit<Deed, 'id' | 'likes' | 'dislikes' | 'slug' | 'numericId'>) => void;
  updateDeed: (id: string, deed: Partial<Deed>) => void;
  deleteDeed: (id: string) => void;
  addVote: (vote: Omit<DeedVote, 'sessionId'>) => void;
  removeVote: (deedId: string) => void;
  trackActivity: (activity: Omit<UserActivity, 'id'>) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      deeds: sampleDeeds,
      votes: [],
      activities: [],
      addDeed: (deed) => set((state) => ({
        deeds: [...state.deeds, {
          ...deed,
          id: crypto.randomUUID(),
          numericId: currentNumericId++,
          likes: 0,
          dislikes: 0,
          slug: generateSlug(deed.title)
        }]
      })),
      updateDeed: (id, deed) => set((state) => ({
        deeds: state.deeds.map((d) => 
          d.id === id ? { ...d, ...deed } : d
        )
      })),
      deleteDeed: (id) => set((state) => ({
        deeds: state.deeds.filter((d) => d.id !== id)
      })),
      addVote: (vote) => set((state) => {
        const sessionId = crypto.randomUUID();
        const existingVote = state.votes.find(
          (v) => v.deedId === vote.deedId
        );

        if (existingVote) {
          return state;
        }

        const updatedDeeds = state.deeds.map((deed) => {
          if (deed.id === vote.deedId) {
            return {
              ...deed,
              likes: vote.type === 'like' ? deed.likes + 1 : deed.likes,
              dislikes: vote.type === 'dislike' ? deed.dislikes + 1 : deed.dislikes,
            };
          }
          return deed;
        });

        return {
          ...state,
          deeds: updatedDeeds,
          votes: [...state.votes, { ...vote, sessionId }],
        };
      }),
      removeVote: (deedId) => set((state) => {
        const vote = state.votes.find((v) => v.deedId === deedId);
        if (!vote) return state;

        const updatedDeeds = state.deeds.map((deed) => {
          if (deed.id === deedId) {
            return {
              ...deed,
              likes: vote.type === 'like' ? deed.likes - 1 : deed.likes,
              dislikes: vote.type === 'dislike' ? deed.dislikes - 1 : deed.dislikes,
            };
          }
          return deed;
        });

        return {
          ...state,
          deeds: updatedDeeds,
          votes: state.votes.filter((v) => v.deedId !== deedId),
        };
      }),
      trackActivity: (activity) => set((state) => ({
        ...state,
        activities: [...state.activities, { ...activity, id: crypto.randomUUID() }]
      })),
    }),
    {
      name: 'good-deeds-storage',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return { ...persistedState, votes: [], activities: [] };
        }
        return persistedState as StoreState;
      },
    }
  )
);