import { ArrowUpRight } from "lucide-react";

import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from "@/components/kibo-ui/announcement";

export const title = "Full composition";

const Example = () => (
  <div className="w-full max-w-lg">
    <Announcement themed>
      <AnnouncementTag>Just launched</AnnouncementTag>
      <AnnouncementTitle>
        Read the release notes
        <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground" />
      </AnnouncementTitle>
    </Announcement>
  </div>
);

export default Example;
