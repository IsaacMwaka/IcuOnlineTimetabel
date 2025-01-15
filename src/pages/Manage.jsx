import React, { useState } from 'react';
import { UserGuard } from 'app';
import { Navigation } from '../components/Navigation';
import { AddScheduleEntry } from '../components/AddScheduleEntry';
import { WeeklySchedule } from '../components/WeeklySchedule';
import { ThemeProvider } from '../components/ThemeProvider';
import { EditScheduleDialog } from '../components/EditScheduleDialog';
import { Button } from '@/components/ui/button';
import { useScheduleStore } from '../utils/store';
import { Cloud } from 'lucide-react';

export default function Manage() {

  const [editingScheduleId, setEditingScheduleId] = useState<string | null>(null);
  const { syncSchedules, isLoading } = useScheduleStore();
  return (
    <UserGuard>
      <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Add New Schedule Entry</h2>
              <AddScheduleEntry />
            </section>
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Current Schedule</h2>
                <Button
                  variant="outline"
                  onClick={syncSchedules}
                  disabled={isLoading}
                >
                  <Cloud className="mr-2 h-4 w-4" />
                  Sync Schedule
                </Button>
              </div>
              <WeeklySchedule isManageView onEdit={setEditingScheduleId} />
              <EditScheduleDialog
                open={!!editingScheduleId}
                onOpenChange={(open) => !open && setEditingScheduleId(null)}
                scheduleId={editingScheduleId}
              />
            </section>
          </div>
        </main>
      </div>
      </ThemeProvider>
    </UserGuard>
  );
}
