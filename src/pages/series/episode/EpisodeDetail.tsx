import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CommentsListContainer from './comment/CommentListContainer';

function MyTabTrigger({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <TabsTrigger
      className="data-[state=active]:bg-zinc-100 border-0 rounded-none data-[state=active]:rounded-none bg-zinc-200 data-[state=active]:shadow-none
      shadow-none
      h-13
      "
      value={value}
    >
      {children}
    </TabsTrigger>
  );
}

export default function EpisodeDetail() {
  return (
    <Tabs defaultValue="comment-list" className="w-full flex flex-1">
      <TabsList className="p-0 w-full">
        <MyTabTrigger value="comment-list">댓글 목록</MyTabTrigger>
        <MyTabTrigger value="comment-analysis">댓글 분석</MyTabTrigger>
        <MyTabTrigger value="comment-stats">댓글 통계</MyTabTrigger>
      </TabsList>
      {/* <div>댓글 수: 500개</div> */}
      <TabsContent className="flex flex-col flex-1" value="comment-list">
        <CommentsListContainer />
      </TabsContent>
      <TabsContent value="comment-analysis"></TabsContent>
      <TabsContent value="comment-stats"></TabsContent>
    </Tabs>
  );
}
