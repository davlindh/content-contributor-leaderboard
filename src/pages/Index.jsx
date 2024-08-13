import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import UserProfile from '../components/UserProfile';
import { useUsers } from '../integrations/supabase';
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Index = () => {
  const { data: users, isLoading, isError } = useUsers();
  const [selectedUser, setSelectedUser] = useState(null);

  if (isLoading) {
    return (
      <div className="min-h-screen p-8 bg-gray-100">
        <h1 className="text-4xl font-bold mb-6 text-center">Top Contributors</h1>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-4">
          <Skeleton className="h-8 w-full mb-4" />
          <Skeleton className="h-8 w-full mb-4" />
          <Skeleton className="h-8 w-full mb-4" />
          <Skeleton className="h-8 w-full mb-4" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen p-8 bg-gray-100">
        <h1 className="text-4xl font-bold mb-6 text-center">Top Contributors</h1>
        <Alert variant="destructive" className="max-w-3xl mx-auto">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was an error loading the contributors. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const sortedUsers = [...users].sort((a, b) => b.contributions - a.contributions).slice(0, 5);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Top Contributors</h1>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contributions</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user, index) => (
              <TableRow key={user.user_id}>
                <TableCell>
                  {index === 0 && <Trophy className="h-6 w-6 text-yellow-500" />}
                  {index === 1 && <Trophy className="h-6 w-6 text-gray-400" />}
                  {index === 2 && <Trophy className="h-6 w-6 text-amber-600" />}
                  {index > 2 && index + 1}
                </TableCell>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.contributions || 0}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className="cursor-pointer"
                    onClick={() => setSelectedUser(user)}
                  >
                    View Profile
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedUser && (
        <UserProfile user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default Index;
