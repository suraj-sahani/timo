"use client";

import { VideoIcon } from "lucide-react";
import { DocumentCountCard } from "./document-card";

export function TotalMeetingTypesCard() {
  return (
    <DocumentCountCard
      documentType="meetingType"
      title="Meeting Types"
      icon={VideoIcon}
    />
  );
}
