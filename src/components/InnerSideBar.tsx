import { Button } from "@/components/ui/button";
import { AlignLeft, Download, Settings } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TextCard } from "./TextCard";
import { convertHTML } from "@/utils/convertHTML";

interface InnerSideBarProps {
  blogText: string;
}

export const InnerSideBar = ({ blogText }: InnerSideBarProps) => {
  const handleClick = () => {
    convertHTML(blogText);
  };

  return (
    <div className="w-[400px] p-4 flex flex-col gap-3">
      <div>
        <h3 className="mb-2 text-sm font-medium">Layout</h3>
        <Select defaultValue="HTML">
          <SelectTrigger>
            <SelectValue placeholder="Select Layout" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="HTML">HTML</SelectItem>
            <SelectItem value="Query">Query</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Setting</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <AlignLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col h-full">
        <h3 className="mb-2 text-sm font-medium">preview</h3>
        <TextCard />
      </div>
      <div className="flex w-full gap-3 mt-auto">
        <Button variant="outline" className="w-full">
          save
        </Button>
        <Button className="w-full" onClick={handleClick}>
          submit
        </Button>
      </div>
    </div>
  );
};
