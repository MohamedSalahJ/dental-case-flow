
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const SystemSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Preferences</CardTitle>
        <CardDescription>
          Manage system-wide settings and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notifications">Email Notifications</Label>
            <div className="text-sm text-muted-foreground">
              Receive email notifications for new cases and messages.
            </div>
          </div>
          <Switch id="notifications" defaultChecked />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="case-updates">Case Status Updates</Label>
            <div className="text-sm text-muted-foreground">
              Get notified when a case status changes.
            </div>
          </div>
          <Switch id="case-updates" defaultChecked />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="deadlines">Deadline Reminders</Label>
            <div className="text-sm text-muted-foreground">
              Receive reminders for upcoming case deadlines.
            </div>
          </div>
          <Switch id="deadlines" defaultChecked />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="auto-logout">Auto Logout</Label>
            <div className="text-sm text-muted-foreground">
              Automatically log out after 30 minutes of inactivity.
            </div>
          </div>
          <Switch id="auto-logout" defaultChecked />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Save preferences</Button>
      </CardFooter>
    </Card>
  );
};

export default SystemSettings;
