import { Link } from 'react-router-dom';
import type { Series } from '../../types/series';
import type { ErrorResponse } from '@/api/schemas';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useCrawlEpisodeList, useCrawlSeries } from '@/hooks/useCrawler';
import { Loader2Icon } from 'lucide-react';
import { addSeriesSchema, type AddSeriesFormData } from '@/schemas';
import ErrorMessage from '@/components/ErrorMessage';

type Props = {
  series: Series[];
  mutateCrawlSeries: ReturnType<typeof useCrawlSeries<ErrorResponse>>;
};

type AddSeriesDialogProps = {
  mutateCrawlSeries: ReturnType<typeof useCrawlSeries<ErrorResponse>>;
};

export default function SeriesList({ series, mutateCrawlSeries }: Props) {
  return (
    <div className="container mx-auto px-4">
      <div className="min-w-full flex justify-end mb-4">
        <AddSeriesDialog mutateCrawlSeries={mutateCrawlSeries} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {series.map((item: Series) => (
          <Card className="" key={item.id}>
            <Link to={`/main/series/${item.id}`}>
              <CardHeader className="p-0 w-full">
                <img
                  src={item.image_src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </CardHeader>
            </Link>
            <CardContent className="p-1 flex-grow">
              <CardTitle className="text-lg text-center font-bold">
                {item.title}
              </CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* <Apollo /> */}
    </div>
  );
}

function AddSeriesDialog({ mutateCrawlSeries }: AddSeriesDialogProps) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<AddSeriesFormData>({
    resolver: zodResolver(addSeriesSchema),
  });

  const mutateCrawlEpisodeList = useCrawlEpisodeList();

  const onSubmit = async (data: AddSeriesFormData) => {
    const id = Number(data.seriesId);
    try {
      await mutateCrawlSeries.mutateAsync({ data: { id } });
      setOpen(false);
      reset();
      const seriesIdString = String(id);
      mutateCrawlEpisodeList.mutate({ seriesId: seriesIdString });
      // 성공 메시지 등 추가 가능
    } catch (error) {
      // 에러 핸들링
      console.error('요청 실패:', error);
    }
  };

  const isMutating = mutateCrawlSeries.isPending;
  const mutationError = mutateCrawlSeries.isError;

  // 에러 메시지 결정 로직
  const getErrorMessage = () => {
    if (formErrors.seriesId) {
      return formErrors.seriesId.message;
    }

    if (mutationError) {
      const error = mutateCrawlSeries.error as ErrorResponse;
      // 404 에러 체크는 error_code로 판단
      if (error?.error_code === 'NOT_FOUND') {
        return '해당 시리즈가 존재하지 않습니다.';
      }
      return '요청중에 오류가 발생했습니다.';
    }
    return null;
  };

  const errorMessage = getErrorMessage();
  const hasError = !!errorMessage;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-white rounded-lg py-3 px-4 shadow hover:bg-primary/80 transition-colors"
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
            <Input
              id="seriesId-1"
              {...register('seriesId')}
              placeholder="시리즈 ID 입력"
            />
            {hasError && <ErrorMessage errorMessage={errorMessage} />}
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
