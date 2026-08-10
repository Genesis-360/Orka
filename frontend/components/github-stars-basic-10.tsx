"use client";

import { GithubStars } from "@/components/github-stars";

export const title = "GitHub Outline Repo";

const Example = () => (
  <GithubStars
    repoUrl="https://github.com/shadcnblocks/blocks"
    repoName="shadcnblocks/blocks"
    starCount="1.2k"
    display="repo"
    variant="outline"
  />
);

export default Example;
