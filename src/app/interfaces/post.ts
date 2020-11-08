export interface Post {
  postId: string;
  title: string;
  text: string;
  authorUid: string;
  createdAt: string;
  likeCount: number;
  likedUserIds: string[];
}
