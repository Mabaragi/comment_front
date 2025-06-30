import {
  //reqact-query hooks
  useCrawlerEpisodeCommentList as useEpisodeCommentList,
  useCrawlerEpisodeRead as useEpisode,
  useCrawlerSeriesCrawlCreate as useCrawlSeries,
  useCrawlerSeriesEpisodeCrawlCreate as useCrawlSeriesEpisode,
  useCrawlerSeriesEpisodeList as useSeriesEpisodeList,
  useCrawlerSeriesList as useSeriesList,
  useCrawlerSeriesRead as useSeries,
  useCrawlerEpisodeCommentCrawlCreate as useCrawlComment,
  //api functions
  crawlerEpisodeCommentList as getCommentList,
  crawlerSeriesEpisodeList as getEpisodeList,
} from '@/api/endpoints';

export {
  //react-query hooks
  useEpisodeCommentList,
  useEpisode,
  useCrawlSeries,
  useCrawlSeriesEpisode,
  useSeriesEpisodeList,
  useSeriesList,
  useSeries,
  useCrawlComment,
  //api functions
  getCommentList,
  getEpisodeList,
};
