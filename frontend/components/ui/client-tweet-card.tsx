"use client"

import { TweetProps, useTweet } from "react-tweet"

import {
  MagicTweet,
  TweetNotFound,
  TweetSkeleton,
} from "@/components/tweet-card"

export const ClientTweetCard = ({
  id,
  apiUrl = `/api/tweet/${id}`,
  fallback = <TweetSkeleton />,
  components,
  fetchOptions,
  onError,
  ...props
}: TweetProps & { className?: string; hideTwitterIcon?: boolean }) => {
  const { data, error, isLoading } = useTweet(id, apiUrl, fetchOptions)

  if (isLoading) return fallback
  if (error || !data) {
    if (onError) return null
    const NotFound = components?.TweetNotFound ?? TweetNotFound
    return <NotFound error={error} />
  }

  return <MagicTweet tweet={data} {...props} />
}
