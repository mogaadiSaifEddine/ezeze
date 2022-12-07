import { FeedComments } from './Feed_Comments';

export interface ClubFeeds {
  feed_id: string;
  poster: string;
  poster_image: string;
  type: string;
  description: string;
  date: Date;
  post: string;
  comments: FeedComments[];
}
