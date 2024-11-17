import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "./ModeToggle";

export const Header = () => {
  return (
    <div className="mt-2">
      <div className="flex justify-between items-center px-4 space-y-1">
        <div>
          <h4 className="text-sm font-medium leading-none">dlgnswk.dev</h4>
          <p className="text-sm text-muted-foreground">Frontend Developer</p>
        </div>
        <ModeToggle />
      </div>
      <Separator className="mt-2" />
    </div>
  );
};
