export interface Post {
  postId: string;
  title: string;
  text: string;
  authorUid: string;
  createdAt: number;
  likeCount: number;
  likedUserIds: string[];
}
