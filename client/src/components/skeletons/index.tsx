// Skeleton loader component for messages
const MessageSkeleton = () => {
  return (
    <>
      {/* Skeleton for a received message */}
      <div className="flex items-center gap-3">
        {/* Circular skeleton for the sender's avatar */}
        <div className="w-10 h-10 bg-white rounded-full animate-pulse shrink-0"></div>
        {/* Skeleton for the message content */}
        <div className="flex flex-col gap-1">
          <div className="w-40 h-4 bg-blue-500 animate-pulse rounded-xl"></div>{" "}
          {/* First line */}
          <div className="w-40 h-4 bg-blue-500 animate-pulse rounded-xl"></div>{" "}
          {/* Second line */}
        </div>
      </div>

      {/* Skeleton for a sent message */}
      <div className="flex items-center justify-end gap-3">
        {/* Skeleton for the message content */}
        <div className="flex flex-col gap-1">
          <div className="w-40 h-4 bg-blue-500 animate-pulse rounded-xl"></div>{" "}
          {/* Single line */}
        </div>
        {/* Circular skeleton for the sender's avatar */}
        <div className="w-10 h-10 bg-white rounded-full animate-pulse shrink-0"></div>
      </div>
    </>
  );
};

export default MessageSkeleton;
