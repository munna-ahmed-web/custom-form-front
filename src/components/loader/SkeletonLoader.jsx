const SkeletonLoader = () => {
  return (
    <div className="flex justify-center items-center">
      <div role="status" class="space-y-4 animate-pulse max-w-2xl">
        <div class="flex items-center w-full">
          <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
          <div class="h-4 ms-3 bg-gray-300 rounded-full dark:bg-gray-600 w-36"></div>
          <div class="h-4 ms-3 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        </div>
        <div class="flex items-center w-full max-w-[600px]">
          <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          <div class="h-4 ms-3 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div class="h-4 ms-3 bg-gray-300 rounded-full dark:bg-gray-600 w-36"></div>
        </div>
        <div class="flex items-center w-full max-w-[500px]">
          <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div class="h-4 ms-3 bg-gray-200 rounded-full dark:bg-gray-700 w-96"></div>
          <div class="h-4 ms-3 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        </div>
        <div class="flex items-center w-full max-w-[600px]">
          <div class="h-4 ms-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          <div class="h-4 ms-3 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div class="h-4 ms-3 bg-gray-300 rounded-full dark:bg-gray-600 w-36"></div>
        </div>
        <div class="flex items-center w-full max-w-[520px]">
          <div class="h-4 ms-3 bg-gray-300 rounded-full dark:bg-gray-600 w-48"></div>
          <div class="h-4 ms-3 bg-gray-300 rounded-full dark:bg-gray-600 w-36"></div>
          <div class="h-4 ms-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
        </div>
        <div class="flex items-center w-full max-w-[440px]">
          <div class="h-4 ms-3 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div class="h-4 ms-3 bg-gray-200 rounded-full dark:bg-gray-700 w-96"></div>
          <div class="h-4 ms-3 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        </div>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default SkeletonLoader;
