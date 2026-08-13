import AuthTweets from "./AuthTweets";

export default function AuthMarketingPanel() {
  return (
    <aside className="flex h-full w-full items-center justify-center bg-night px-8 py-12 xl:px-16">
      <div className="w-full max-w-lg">
        <AuthTweets />
      </div>
    </aside>
  );
}