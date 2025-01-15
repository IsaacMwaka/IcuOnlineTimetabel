import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from 'app';
import { firebaseAuth } from 'app';
import { toast } from 'sonner';

export function Navigation() {
  const navigate = useNavigate();
  const { user, loading } = useCurrentUser();

  const handleSignOut = async () => {
    try {
      await firebaseAuth.signOut();
      toast.success('Successfully logged out');
      navigate('/login');
    } catch (err) {
      console.error('Failed to sign out:', err);
      toast.error('Failed to log out');
    }
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">School Timetable</h1>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
              >
                View Schedule
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/manage')}
              >
                Manage Schedule
              </Button>
              <Button
                variant="ghost"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
            </>
          ) : loading ? (
            <span className="text-sm text-muted-foreground">Loading...</span>
          ) : (
            <Button
              variant="ghost"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
