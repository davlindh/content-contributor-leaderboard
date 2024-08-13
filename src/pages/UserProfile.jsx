import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCurrentUser, useUpdateUser } from '../integrations/supabase';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const UserProfile = () => {
  const { data: currentUser, isLoading, isError } = useCurrentUser();
  const updateUser = useUpdateUser();
  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (currentUser) {
      reset(currentUser);
    }
  }, [currentUser, reset]);

  const onSubmit = async (data) => {
    try {
      await updateUser.mutateAsync({ userId: currentUser.user_id, updates: data });
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-8 bg-gray-100">
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
          <Skeleton className="h-8 w-full mb-4" />
          <Skeleton className="h-8 w-full mb-4" />
          <Skeleton className="h-8 w-full mb-4" />
        </div>
      </div>
    );
  }

  if (isError || !currentUser) {
    return (
      <div className="min-h-screen p-8 bg-gray-100">
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
          <p className="text-red-500">Error loading user profile. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">User Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <Input id="username" {...register('username')} disabled={!isEditing} />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input id="email" {...register('email')} disabled={!isEditing} />
          </div>
          {isEditing ? (
            <div className="flex justify-end space-x-2">
              <Button type="submit">Save</Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          ) : (
            <Button type="button" onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
