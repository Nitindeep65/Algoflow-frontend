import React from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";  

function Admin() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Database /> 
        </EmptyMedia>
        <EmptyTitle>No data</EmptyTitle>
        <EmptyDescription>No data found</EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Button onClick={() => window.location.href = '/newProject'}>Add data</Button>
      </EmptyContent>
    </Empty>
  );
}

export default Admin;
