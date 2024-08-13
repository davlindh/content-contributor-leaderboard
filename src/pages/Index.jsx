import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import UserProfile from '../components/UserProfile';
import { useUsers } from '../integrations/supabase';
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const contributors = [
  { name: "GPT-Engineer", contributions: Math.floor(Math.random() * 1000) },
  { name: "Blue Science Park", contributions: Math.floor(Math.random() * 1000) },
  { name: "Istudios Visuals", contributions: Math.floor(Math.random() * 1000) },
  { name: "Paraply Production", contributions: Math.floor(Math.random() * 1000) },
  { name: "GBCCAM.ORG", contributions: Math.floor(Math.random() * 1000) },
  { name: "REWAC.ORG", contributions: Math.floor(Math.random() * 1000) }
];

const Index = () => {
  const [sortedContributors, setSortedContributors] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const sorted = [...contributors].sort((a, b) => b.contributions - a.contributions);
    setSortedContributors(sorted);
  }, []);

  if (sortedContributors.length === 0) {
    return (
      <div className="min-h-screen p-8 bg-gray-100">
        <h1 className="text-4xl font-bold mb-6 text-center">Top Contributors</h1>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-8 w-full mb-4" />
          ))}
        </div>
      </div>
    );
  }

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
            {sortedContributors.map((contributor, index) => (
              <TableRow key={contributor.name}>
                <TableCell>
                  {index === 0 && <Trophy className="h-6 w-6 text-yellow-500" />}
                  {index === 1 && <Trophy className="h-6 w-6 text-gray-400" />}
                  {index === 2 && <Trophy className="h-6 w-6 text-amber-600" />}
                  {index > 2 && index + 1}
                </TableCell>
                <TableCell className="font-medium">{contributor.name}</TableCell>
                <TableCell>{contributor.contributions}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className="cursor-pointer"
                    onClick={() => setSelectedUser(contributor)}
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
