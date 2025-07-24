import { Link } from 'react-router-dom';
import type { Series } from '../../types/series';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCrawlSeries } from '@/hooks/useCrawler';
import { Loader2Icon } from 'lucide-react';
import Apollo from './Apollo';

type Props = {
  series: Series[];
  mutateCrawlSeries: ReturnType<typeof useCrawlSeries>;
};

type AddSeriesDialogProps = {
  mutateCrawlSeries: ReturnType<typeof useCrawlSeries>;
};

export default function SeriesList({ series, mutateCrawlSeries }: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-start gap-6">
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {series.map((item: Series) => (
              <Link to={`/main/series/${item.id}`} key={item.id}>
                <Card className="overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-lg h-full flex flex-col">
                  <CardHeader className="p-0">
                    <img
                      src={item.image_src}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-4 flex-grow">
                    <CardTitle className="text-lg font-bold">
                      {item.title}
                    </CardTitle>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        <div className="min-w-[180px]">
          <AddSeriesDialog mutateCrawlSeries={mutateCrawlSeries} />
        </div>
      </div>
      <Apollo />
    </div>
  );
}

function AddSeriesDialog({ mutateCrawlSeries }: AddSeriesDialogProps) {
  const [open, setOpen] = useState(false);

  type FormData = {
    seriesId: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const id = Number(data.seriesId);
    if (!isNaN(id) && id > 0) {
      mutateCrawlSeries.mutate({ data: { id } });
      console.log(`Crawling series with ID: ${id}`);
      setOpen(false);
      reset();
    } else {
      setError('seriesId', {
        type: 'manual',
        message: '올바른 시리즈 ID를 입력하세요.',
      });
    }
  };
  const isMutating = mutateCrawlSeries.isPending;
  const hasError = mutateCrawlSeries.isError;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-white rounded-lg py-3 px-4 shadow hover:bg-primary/80 transition-colors"
          onClick={() => setOpen(true)}
          disabled={isMutating}
        >
          {isMutating ? (
            <>
              <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
              추가 중...
            </>
          ) : (
            '+ 시리즈 추가'
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>시리즈 추가</DialogTitle>
          <DialogDescription>
            시리즈 정보를 입력하세요. 완료되면 저장 버튼을 클릭하세요.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Input
                id="seriesId-1"
                {...register('seriesId', {
                  required: '시리즈 ID를 입력하세요',
                })}
                placeholder="시리즈 ID 입력"
              />
              {errors.seriesId && (
                <p className="text-sm text-red-500">
                  {errors.seriesId.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <Button type="submit">저장</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
