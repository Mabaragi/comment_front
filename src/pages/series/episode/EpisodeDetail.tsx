import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CommentsList from './comment/CommentList';

function MyTabTrigger({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <TabsTrigger
      className="data-[state=active]:bg-zinc-100 border-0 rounded-none data-[state=active]:rounded-none bg-zinc-200 data-[state=active]:shadow-none"
      value={value}
    >
      {children}
    </TabsTrigger>
  );
}

export default function EpisodeDetail() {
  return (
    <Tabs defaultValue="comment-list" className="w-full">
      <TabsList className="p-0 w-full">
        <MyTabTrigger value="comment-list">댓글 목록</MyTabTrigger>
        <MyTabTrigger value="comment-analysis">댓글 분석</MyTabTrigger>
        <MyTabTrigger value="comment-stats">댓글 통계</MyTabTrigger>
      </TabsList>
      <TabsContent value="comment-list">
        <CommentsList />
      </TabsContent>
      <TabsContent value="comment-analysis"></TabsContent>
      <TabsContent value="comment-stats"></TabsContent>
    </Tabs>
  );
}
