"use client"

import { TweetProps, useTweet } from "react-tweet"

import {
  MagicTweet,
  TweetFallback,
  TweetSkeleton,
} from "@/components/tweet-card"

export const ClientTweetCard = ({
  id,
  handle,
  apiUrl = `/api/tweet/${id}`,
  fallback = <TweetSkeleton />,
  fetchOptions,
  ...props
}: TweetProps & { className?: string; hideTwitterIcon?: boolean; handle?: string }) => {
  const { data, error, isLoading } = useTweet(id, apiUrl, fetchOptions)

  if (isLoading) return fallback
  if (error || !data) {
    return <TweetFallback handle={handle} />
  }

  return <MagicTweet tweet={data} {...props} />
}
