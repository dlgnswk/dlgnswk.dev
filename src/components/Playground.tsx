import { Header } from "@/components/Header";
import { InnerSideBar } from "./InnerSideBar";
import { useState } from "react";
import { TextareaSheet } from "./TextareaSheet";

export default function Playground() {
  const [blogText, setBlogText] = useState<string>("");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <TextareaSheet setBlogText={setBlogText} />
        <InnerSideBar blogText={blogText} />
      </div>
    </div>
  );
}
