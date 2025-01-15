import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useScheduleStore } from '../utils/store';
import { toast } from 'sonner';
import brain from 'brain';
import { useCurrentUser } from 'app';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { CourseResponse } from 'types';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const times = ['09:00-10:30', '11:00-12:30', '14:00-15:30', '15:30-17:00'];

const formSchema = z.object({
  course_id: z.string().min(1, 'Course is required'),
  lecturer: z.string().min(1, 'Lecturer name is required'),
  time: z.string().min(1, 'Time slot is required'),
  day: z.string().min(1, 'Day is required'),
  room: z.string().min(1, 'Room number is required'),
});

type EditScheduleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scheduleId: string | null;
};

export function EditScheduleDialog({ open, onOpenChange, scheduleId }: EditScheduleDialogProps) {
  const { user } = useCurrentUser();
  const [courses, setCourses] = useState<CourseResponse[]>([]);
  const { schedules, editSchedule } = useScheduleStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course_id: '',
      lecturer: '',
      time: '',
      day: '',
      room: '',
    },
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await brain.get_courses({ authorizeAsUser: user?.uid });
        const coursesData = await response.json();
        setCourses(coursesData);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        toast.error('Failed to fetch courses');
      }
    };

    if (open) {
      fetchCourses();
    }
  }, [open, user]);

  useEffect(() => {
    if (scheduleId && open) {
      const schedule = schedules.find(s => s.id === scheduleId);
      if (schedule) {
        form.reset({
          course_id: schedule.course.id,
          lecturer: schedule.lecturer,
          time: schedule.time,
          day: schedule.day,
          room: schedule.room,
        });
      }
    }
  }, [scheduleId, schedules, open, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (scheduleId) {
      try {
        await editSchedule(scheduleId, values);
        onOpenChange(false);
        form.reset();
      } catch (error) {
        console.error('Failed to update schedule:', error);
        toast.error('Failed to update schedule');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Schedule Entry</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="course_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.code} - {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lecturer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lecturer</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter lecturer name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="day"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Day</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a day" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {days.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {times.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="room"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter room number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
