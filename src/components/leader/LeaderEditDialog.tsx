
import { useState, useEffect } from "react";
import { Leader } from "@/lib/leader-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  updateLeaderName,
  updateLeaderImage,
  updateLeaderCountry,
  updateLeaderCountryCode 
} from "@/lib/leader-data";

interface LeaderEditDialogProps {
  leader: Leader;
  onUpdate: (updates: {
    name?: string;
    image?: string;
    country?: string;
    countryCode?: string;
  }) => void;
}

const LeaderEditDialog = ({ leader, onUpdate }: LeaderEditDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState(leader.name);
  const [newImageUrl, setNewImageUrl] = useState(leader.image);
  const [newCountry, setNewCountry] = useState(leader.country);
  const [newCountryCode, setNewCountryCode] = useState(leader.countryCode);

  useEffect(() => {
    // Reset form when leader changes
    setNewName(leader.name);
    setNewImageUrl(leader.image);
    setNewCountry(leader.country);
    setNewCountryCode(leader.countryCode);
  }, [leader]);

  const handleUpdateLeader = () => {
    try {
      const updates: Record<string, string> = {};
      
      // Update the leader's name
      if (newName !== leader.name) {
        updateLeaderName(leader.id, newName);
        updates.name = newName;
      }
      
      // Update the leader's image
      if (newImageUrl !== leader.image) {
        updateLeaderImage(leader.id, newImageUrl);
        updates.image = newImageUrl;
      }
      
      // Update country and country code
      if (newCountry !== leader.country) {
        updateLeaderCountry(leader.id, newCountry);
        updates.country = newCountry;
      }
      
      if (newCountryCode !== leader.countryCode) {
        updateLeaderCountryCode(leader.id, newCountryCode);
        updates.countryCode = newCountryCode;
      }
      
      // Close the dialog
      setIsOpen(false);
      
      // Call the onUpdate callback to update parent state
      onUpdate(updates);
      
      toast.success("Leader updated", {
        description: "The leader information has been updated successfully."
      });
    } catch (error) {
      console.error("Error updating leader:", error);
      toast.error("Update failed", {
        description: "There was an error updating the leader information."
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="icon" 
          variant="ghost" 
          className="absolute top-2 left-2 z-20 w-8 h-8 bg-gray-800/70 hover:bg-gray-700"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Leader</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="image" className="text-right text-sm font-medium">
              Image URL
            </label>
            <Input
              id="image"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="col-span-3"
              placeholder="Enter image URL"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="country" className="text-right text-sm font-medium">
              Country
            </label>
            <Input
              id="country"
              value={newCountry}
              onChange={(e) => setNewCountry(e.target.value)}
              className="col-span-3"
              placeholder="e.g. United States"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="countryCode" className="text-right text-sm font-medium">
              Country Code
            </label>
            <Input
              id="countryCode"
              value={newCountryCode}
              onChange={(e) => setNewCountryCode(e.target.value)}
              className="col-span-3"
              placeholder="e.g. US, GB, JP (ISO 3166-1 alpha-2)"
              maxLength={2}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleUpdateLeader}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaderEditDialog;
