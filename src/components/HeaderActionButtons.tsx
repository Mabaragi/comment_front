import { PlusIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
// import { useCrawlerSeriesCrawlCreate } from '@/api/generated';
// import { SeriesCreate } from '@/api/generated.schemas';

export default function HeaderActionButtons() {
  return (
    <div className="flex justify-end items-center border-b-2 border-yellow-200 w-full h-12 px-6 gap-2">
      <button
        className="bg-yellow-100 py-2 px-2 rounded hover:bg-yellow-300 transition duration-300 ease-in-out"
        title="새 항목 추가"
        aria-label="새 항목 추가"
        onClick={() => null}
      >
        <PlusIcon className="h-6 w-6 inline-block" />
      </button>

      <button
        className="bg-yellow-100 py-2 px-2 rounded hover:bg-yellow-300 transition duration-300 ease-in-out"
        title="더보기"
        aria-label="더보기"
      >
        <EllipsisVerticalIcon className="h-6 w-6 inline-block " />
      </button>
    </div>
  );
}
