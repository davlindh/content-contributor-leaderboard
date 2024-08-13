import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const UserProfile = ({ user, onClose }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{user.name}'s Profile</DialogTitle>
          <DialogDescription>
            Total Contributions: {user.contributions}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Contributed Content:</h4>
          <div className="flex flex-wrap gap-2">
            {user.content.map((item, index) => (
              <Badge key={index} variant="secondary">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;
