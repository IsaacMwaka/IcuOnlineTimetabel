import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SignInOrUpForm } from "app";

export default function Login() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to access your school timetable
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInOrUpForm signInOptions={{ google: true }} />
        </CardContent>
      </Card>
    </div>
  );
}