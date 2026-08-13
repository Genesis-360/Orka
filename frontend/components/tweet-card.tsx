import { Suspense } from "react"
import Image from "next/image"
import { Heart, MessageCircle } from "lucide-react"
import { enrichTweet, type EnrichedTweet, type TweetProps, formatNumber } from "react-tweet"
import { getTweet, type Tweet } from "react-tweet/api"

import { cn } from "@/lib/utils"
import { RiTwitterXFill, RiVerifiedBadgeFill } from "react-icons/ri"

interface TwitterIconProps {
  className?: string
  [key: string]: unknown
}
const Twitter = ({ className, ...props }: TwitterIconProps) => (
  <RiTwitterXFill className={className} {...props} />
)

const Verified = ({ className, ...props }: TwitterIconProps) => (
  <RiVerifiedBadgeFill className={className} {...props} />
)

export const truncate = (str: string | null, length: number) => {
  if (!str || str.length <= length) return str
  return `${str.slice(0, length - 3)}...`
}

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("bg-primary/10 rounded-md", className)} {...props} />
  )
}

export const TweetSkeleton = ({
  className,
  ...props
}: {
  className?: string
  [key: string]: unknown
}) => (
  <div
    className={cn(
      "flex size-full max-h-max min-w-72 flex-col gap-2 rounded-xl border p-4",
      className
    )}
    {...props}
  >
    <div className="flex flex-row gap-2">
      <Skeleton className="size-10 shrink-0 rounded-full" />
      <Skeleton className="h-10 w-full" />
    </div>
    <Skeleton className="h-20 w-full" />
  </div>
)

export const TweetNotFound = ({
  className,
  ...props
}: {
  className?: string
  [key: string]: unknown
}) => (
  <div
    className={cn(
      "flex size-full flex-col items-center justify-center gap-2 rounded-lg border p-4",
      className
    )}
    {...props}
  >
    <h3>Tweet not found</h3>
  </div>
)

export const TweetFallback = ({ handle }: { handle?: string }) => (
  <div className="flex h-fit w-full flex-col items-center justify-center gap-3 rounded-xl border border-night/10 bg-white p-6 text-center">
    <Twitter className="size-6 text-night/40" />
    <p className="text-sm font-medium text-night/60">
      This post is no longer available.
    </p>
    <a
      href={handle ? `https://x.com/${handle.replace(/^@/, "")}` : "https://x.com/get_orka"}
      target="_blank"
      rel="noreferrer"
      className="text-sm font-semibold text-violet transition-colors hover:text-[#a78cff]"
    >
      {handle ? `View ${handle} on X` : "Follow ORKA on X"}
    </a>
  </div>
)

export const TweetEngagement = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="mt-2 flex items-center justify-between text-night/50">
    <div className="flex items-center gap-5">
      <a
        href={tweet.reply_url}
        target="_blank"
        rel="noreferrer"
        title="Replies"
        className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-night"
      >
        <MessageCircle
          size={16}
          className="transition-transform duration-200 group-hover:scale-110"
        />
        <span className="tabular-nums">{formatNumber(tweet.conversation_count)}</span>
      </a>
      <a
        href={tweet.like_url}
        target="_blank"
        rel="noreferrer"
        title="Likes"
        className="group/like inline-flex items-center gap-1.5 text-sm transition-colors hover:text-[#f91880]"
      >
        <Heart
          size={16}
          className="transition-transform duration-200 group-hover/like:scale-110 group-hover/like:text-[#f91880]"
        />
        <span className="tabular-nums">{formatNumber(tweet.favorite_count)}</span>
      </a>
    </div>
    <a
      href={tweet.url}
      target="_blank"
      rel="noreferrer"
      aria-label="View this post on X"
      title="View on X"
      className="text-night/40 transition-all hover:scale-105 hover:text-night"
    >
      <Twitter className="size-4" />
    </a>
  </div>
)

export const TweetHeader = ({ tweet, hideTwitterIcon }: { tweet: EnrichedTweet; hideTwitterIcon?: boolean }) => (
  <div className="flex flex-row items-start justify-between tracking-normal">
    <div className="flex items-center space-x-3">
      <a
        href={tweet.user.url}
        target="_blank"
        rel="noreferrer"
        className="shrink-0"
      >
        <Image
          title={`Profile picture of ${tweet.user.name}`}
          alt={tweet.user.screen_name}
          height={48}
          width={48}
          src={tweet.user.profile_image_url_https}
          className="border-border/50 size-12 overflow-hidden rounded-full border object-cover"
        />
      </a>
      <div className="flex flex-col gap-0.5">
        <a
          href={tweet.user.url}
          target="_blank"
          rel="noreferrer"
          className="text-night flex items-center font-medium whitespace-nowrap transition-opacity hover:opacity-80"
        >
          {truncate(tweet.user.name, 20)}
          {tweet.user.verified ||
            (tweet.user.is_blue_verified && (
              <Verified className="ml-1 inline size-4 text-blue-500" />
            ))}
        </a>
        <div className="flex items-center space-x-1">
          <a
            href={tweet.user.url}
            target="_blank"
            rel="noreferrer"
            className="text-night/60 hover:text-night text-sm transition-colors"
          >
            @{truncate(tweet.user.screen_name, 16)}
          </a>
        </div>
      </div>
    </div>
    {!hideTwitterIcon && (
      <a href={tweet.url} target="_blank" rel="noreferrer">
        <span className="sr-only">Link to tweet</span>
        <Twitter className="text-night/60 hover:text-night size-5 items-start transition-all ease-in-out hover:scale-105" />
      </a>
    )}
  </div>
)

export const TweetBody = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="text-[15px] leading-relaxed tracking-normal wrap-break-word">
    {tweet.entities.map((entity, idx) => {
      switch (entity.type) {
        case "url":
        case "symbol":
        case "hashtag":
        case "mention":
          return (
            <a
              key={idx}
              href={entity.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-night/60 hover:text-night text-[15px] font-normal transition-colors"
            >
              <span>{entity.text}</span>
            </a>
          )
        case "text":
          return (
            <span
              key={idx}
              className="text-night text-[15px] font-normal"
              dangerouslySetInnerHTML={{ __html: entity.text }}
            />
          )
        default:
          return null
      }
    })}
  </div>
)

export const TweetMedia = ({ tweet }: { tweet: EnrichedTweet }) => {
  if (!tweet.video && !tweet.photos) return null
  return (
    <div className="flex flex-1 items-center justify-center">
      {tweet.video && (
        <video
          poster={tweet.video.poster}
          autoPlay
          loop
          muted
          playsInline
          className="rounded-xl border shadow-sm"
        >
          <source src={tweet.video.variants[0].src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {tweet.photos && (
        <div className="relative flex transform-gpu snap-x snap-mandatory gap-4 overflow-x-auto">
          <div className="shrink-0 snap-center sm:w-2" />
          {tweet.photos.map((photo) => (
            <div
              key={photo.url}
              className="relative h-64 w-5/6 shrink-0 snap-center snap-always"
            >
              <Image
                src={photo.url}
                fill
                sizes="(max-width: 640px) 83vw, 320px"
                title={"Photo by " + tweet.user.name}
                alt={tweet.text}
                className="rounded-xl border object-cover shadow-sm"
              />
            </div>
          ))}
          <div className="shrink-0 snap-center sm:w-2" />
        </div>
      )}
      {!tweet.video &&
        !tweet.photos &&
        // @ts-expect-error package doesn't have type definitions
        tweet?.card?.binding_values?.thumbnail_image_large?.image_value.url && (
          <div className="relative h-64">
            <Image
              src={
                // @ts-expect-error package doesn't have type definitions
                tweet.card.binding_values.thumbnail_image_large.image_value.url
              }
              fill
              sizes="320px"
              className="rounded-xl border object-cover shadow-sm"
              alt={tweet.text}
            />
          </div>
        )}
    </div>
  )
}

const withSafeEntities = <T extends { entities?: Tweet["entities"] }>(
  tweet: T
): T & { entities: Tweet["entities"] } => ({
  ...tweet,
  entities: {
    ...tweet.entities,
    hashtags: tweet.entities?.hashtags ?? [],
    urls: tweet.entities?.urls ?? [],
    symbols: tweet.entities?.symbols ?? [],
    user_mentions: tweet.entities?.user_mentions ?? [],
  },
})

export const MagicTweet = ({
  tweet,
  className,
  hideTwitterIcon,
  ...props
}: {
  tweet: Tweet
  className?: string
  hideTwitterIcon?: boolean
}) => {
  const safeTweet: Tweet = {
    ...withSafeEntities(tweet),
    quoted_tweet: tweet.quoted_tweet
      ? withSafeEntities(tweet.quoted_tweet)
      : undefined,
  }
  const enrichedTweet = enrichTweet(safeTweet)
  return (
    <div
      className={cn(
        "group relative flex h-fit w-full flex-col gap-4 overflow-hidden rounded-xl border border-night/10 bg-white p-5",
        className
      )}
      {...props}
    >
      <TweetHeader tweet={enrichedTweet} hideTwitterIcon={hideTwitterIcon} />
      <TweetBody tweet={enrichedTweet} />
      <TweetMedia tweet={enrichedTweet} />
      <TweetEngagement tweet={enrichedTweet} />
    </div>
  )
}

/**
 * TweetCard (Server Side Only)
 */
export const TweetCard = async ({
  id,
  components,
  fallback = <TweetSkeleton />,
  onError,
  ...props
}: TweetProps & {
  className?: string
}) => {
  const tweet = id
    ? await getTweet(id).catch((err) => {
        if (onError) {
          onError(err)
        } else {
          console.error(err)
        }
      })
    : undefined

  if (!tweet) {
    const NotFound = components?.TweetNotFound ?? TweetNotFound
    return <NotFound {...props} />
  }

  return (
    <Suspense fallback={fallback}>
      <MagicTweet tweet={tweet} {...props} />
    </Suspense>
  )
}
