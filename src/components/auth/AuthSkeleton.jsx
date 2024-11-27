function AuthSkeleton() {
  return (
    <div className="animate-pulse space-y-6 w-full max-w-md mx-auto">
      {/* Logo Skeleton */}
      <div className="flex justify-center">
        <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Title Skeleton */}
      <div className="space-y-3">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
        <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
      </div>

      {/* Social Buttons Skeleton */}
      <div className="space-y-3">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Divider Skeleton */}
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>

      {/* Form Fields Skeleton */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  );
}

export default AuthSkeleton;