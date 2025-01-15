import { create } from 'zustand';
import { useEffect } from 'react';
import { useCurrentUser } from 'app';
import brain from 'brain';
import { toast } from 'sonner';

import type { ScheduleResponse, ScheduleCreate } from "types";

type ScheduleEntry = ScheduleResponse;

type ScheduleStore = {
  schedules: ScheduleEntry[];
  isLoading: boolean;
  fetchSchedules: () => Promise<void>;
  addSchedule: (schedule: ScheduleCreate) => Promise<void>;
  removeSchedule: (id: string) => Promise<void>;
  editSchedule: (id: string, schedule: ScheduleCreate) => Promise<void>;
};

const store = create<ScheduleStore>((set) => ({
  schedules: [],
  isLoading: false,

  fetchSchedules: async () => {
    set({ isLoading: true });
    try {
      const { user } = useCurrentUser();
      const response = await brain.get_schedules({ authorizeAsUser: user?.uid });
      const schedules = await response.json();
      console.log('Fetched schedules:', schedules);
      set({ schedules });
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
      toast.error('Failed to fetch schedules');
    } finally {
      set({ isLoading: false });
    }
  },

  addSchedule: async (schedule) => {
    try {
      const { user } = useCurrentUser();
      const response = await brain.create_schedule({ body: schedule, authorizeAsUser: user?.uid });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to add schedule');
      }
      const newSchedule = await response.json();
      console.log('Added schedule:', newSchedule);
      set((state) => ({
        schedules: [...state.schedules, newSchedule]
      }));
      toast.success('Schedule added successfully');
    } catch (error) {
      console.error('Failed to add schedule:', error);
      toast.error('Failed to add schedule');
    }
  },

  removeSchedule: async (id) => {
    try {
      const { user } = useCurrentUser();
      await brain.delete_schedule({ pathArgs: { schedule_id: id }, authorizeAsUser: user?.uid });
      set((state) => ({
        schedules: state.schedules.filter((schedule) => schedule.id !== id)
      }));
      toast.success('Schedule deleted successfully');
    } catch (error) {
      console.error('Failed to delete schedule:', error);
      toast.error('Failed to delete schedule');
    }
  },

  editSchedule: async (id, schedule) => {
    try {
      const { user } = useCurrentUser();
      const response = await brain.update_schedule({ pathArgs: { schedule_id: id }, body: schedule, authorizeAsUser: user?.uid });
      const updatedSchedule = await response.json();
      set((state) => ({
        schedules: state.schedules.map((s) =>
          s.id === id ? updatedSchedule : s
        )
      }));
      toast.success('Schedule updated successfully');
    } catch (error) {
      console.error('Failed to update schedule:', error);
      toast.error('Failed to update schedule');
    }
  },
}));

export const useScheduleStore = () => {
  const { user } = useCurrentUser();
  const storeState = store();

  useEffect(() => {
    if (user) {
      storeState.fetchSchedules();
    }
  }, [user]);

  return storeState;
};
