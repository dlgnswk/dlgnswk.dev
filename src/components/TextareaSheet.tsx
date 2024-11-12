import { useRef, type Dispatch, type SetStateAction } from "react";
import { Textarea } from "@/components/ui/textarea";

interface TextareaSheetProps {
  setBlogText: Dispatch<SetStateAction<string>>;
}

export const TextareaSheet = ({ setBlogText }: TextareaSheetProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleChange = () => {
    if (!textareaRef.current) return;

    setBlogText(textareaRef.current.value);
  };

  return (
    <div className="flex-1 p-4 border-r">
      <Textarea
        ref={textareaRef}
        className="min-h-full resize-none"
        placeholder="Enter your prompt..."
        onChange={handleChange}
      />
    </div>
  );
};
