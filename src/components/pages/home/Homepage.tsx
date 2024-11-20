"use client";

import { Suspense } from "react";
import { Contributions2D } from "./Contributions2D";
import { BlogTable } from "./BlogTable";

export function Homepage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Contributions2D />
      </Suspense>
      <BlogTable />
    </>
  );
}
