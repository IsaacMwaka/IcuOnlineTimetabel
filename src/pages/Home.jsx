import React from "react";
import { UserGuard } from "app";
import { Navigation } from "../components/Navigation";
import { WeeklySchedule } from "../components/WeeklySchedule";
import { AddScheduleEntry } from "../components/AddScheduleEntry";
import { ThemeProvider } from "../components/ThemeProvider";

export default function App() {

  return (
    <UserGuard>
      <ThemeProvider>
      <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Weekly Schedule</h1>
          <AddScheduleEntry />
        </div>
        <WeeklySchedule />
      </main>
      </div>
      </ThemeProvider>
    </UserGuard>
  );
}
