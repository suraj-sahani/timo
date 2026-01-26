"use client";

import { UsersIcon } from "lucide-react";
import { DocumentCountCard } from "./document-card";

export function NewUsersCard() {
  return (
    <DocumentCountCard
      documentType="user"
      title="Total Users"
      icon={UsersIcon}
    />
  );
}
