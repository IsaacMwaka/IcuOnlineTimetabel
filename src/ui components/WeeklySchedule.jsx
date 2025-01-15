import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useScheduleStore } from '../utils/store';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const times = ['09:00-10:30', '11:00-12:30', '14:00-15:30', '15:30-17:00'];

type WeeklyScheduleProps = {
  isManageView?: boolean;
  onEdit?: (id: string) => void;
};

export function WeeklySchedule({ isManageView, onEdit }: WeeklyScheduleProps) {
  const { schedules, fetchSchedules, isLoading } = useScheduleStore();

  console.log('Current schedules in WeeklySchedule:', schedules);

  React.useEffect(() => {
    fetchSchedules();
  }, []);
  const { removeSchedule } = useScheduleStore();

  const handleDelete = (id: string) => {
    removeSchedule(id);
    toast.success('Schedule entry deleted successfully');
  };

  if (isLoading) {
    return (
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-6 gap-4">
            <div className="font-medium p-4"></div>
            {days.map((day) => (
              <div key={day} className="font-medium p-4 text-center">
                {day}
              </div>
            ))}
            {times.map((time) => (
              <React.Fragment key={time}>
                <div className="p-4 font-medium">{time}</div>
                {days.map((day) => (
                  <div key={`${day}-${time}`} className="p-2">
                    <Skeleton className="h-24 w-full" />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-6 gap-4">
          <div className="font-medium p-4"></div>
          {days.map((day) => (
            <div key={day} className="font-medium p-4 text-center">
              {day}
            </div>
          ))}
          {times.map((time) => (
            <React.Fragment key={time}>
              <div className="p-4 font-medium">{time}</div>
              {days.map((day) => {
                const schedule = schedules.find(
                  (s) => s.day === day && s.time === time
                );
                console.log(`Checking schedule for ${day} at ${time}:`, schedule);
                return (
                  <div key={`${day}-${time}`} className="p-2">
                    {schedule && (
                      <Card className="p-3 h-full bg-accent hover:bg-accent/80 transition-colors cursor-pointer relative group">
                        <p className="font-medium">{schedule.course.code}</p>
                        <p className="text-sm text-muted-foreground">{schedule.course.name}</p>
                        <p className="text-sm text-muted-foreground">{schedule.lecturer}</p>
                        <p className="text-sm text-muted-foreground">{schedule.room}</p>
                        {isManageView && (
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                onEdit?.(schedule.id);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(schedule.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </Card>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
