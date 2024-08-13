import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import UserProfile from '../components/UserProfile';

const Index = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", contributions: 150, content: ["Article A", "Video B", "Tutorial C"] },
    { id: 2, name: "Bob", contributions: 120, content: ["Article X", "Video Y"] },
    { id: 3, name: "Charlie", contributions: 100, content: ["Tutorial Z", "Article W"] },
    { id: 4, name: "Diana", contributions: 80, content: ["Video V", "Article U"] },
    { id: 5, name: "Ethan", contributions: 60, content: ["Tutorial T"] },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);

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
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>
                  {index === 0 && <Trophy className="h-6 w-6 text-yellow-500" />}
                  {index === 1 && <Trophy className="h-6 w-6 text-gray-400" />}
                  {index === 2 && <Trophy className="h-6 w-6 text-amber-600" />}
                  {index > 2 && index + 1}
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.contributions}</TableCell>
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
