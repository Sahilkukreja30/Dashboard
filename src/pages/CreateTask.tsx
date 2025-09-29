import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CreateTask() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    phoneNumber: "",
    assignedTo: "",
    priority: "",
    description: "",
    metadata: {} as Record<string, string>
  });
  
  const [metadataKey, setMetadataKey] = useState("");
  const [metadataValue, setMetadataValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.phoneNumber) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate task creation
    toast({
      title: "Task Created",
      description: `Task "${formData.title}" has been created and assigned to ${formData.phoneNumber}`,
    });
    
    // Reset form and navigate back
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const addMetadata = () => {
    if (metadataKey && metadataValue) {
      setFormData(prev => ({
        ...prev,
        metadata: { ...prev.metadata, [metadataKey]: metadataValue }
      }));
      setMetadataKey("");
      setMetadataValue("");
    }
  };

  const removeMetadata = (key: string) => {
    setFormData(prev => ({
      ...prev,
      metadata: Object.fromEntries(Object.entries(prev.metadata).filter(([k]) => k !== key))
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/')}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Create New Task</h1>
          <p className="text-muted-foreground">Set up a new Twilio automation task</p>
        </div>
      </div>

      {/* Form */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter task title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  placeholder="+1234567890"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assigned">Assigned To</Label>
                <Input
                  id="assigned"
                  value={formData.assignedTo}
                  onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
                  placeholder="Enter assignee name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter task description..."
                rows={3}
              />
            </div>

            {/* Metadata */}
            <div className="space-y-4">
              <Label>Metadata</Label>
              
              {/* Add metadata */}
              <div className="flex gap-2">
                <Input
                  placeholder="Key"
                  value={metadataKey}
                  onChange={(e) => setMetadataKey(e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Value"
                  value={metadataValue}
                  onChange={(e) => setMetadataValue(e.target.value)}
                  className="flex-1"
                />
                <Button type="button" onClick={addMetadata} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Display metadata */}
              {Object.entries(formData.metadata).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {Object.entries(formData.metadata).map(([key, value]) => (
                    <Badge key={key} variant="secondary" className="gap-2">
                      <span>{key}: {value}</span>
                      <button
                        type="button"
                        onClick={() => removeMetadata(key)}
                        className="hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                Create Task
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}