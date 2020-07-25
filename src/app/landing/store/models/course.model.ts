export interface Course {
  id: string;
  title: string; // 255 char
  author: string;
  authorId: string;
  level: string;
  price: number;
  applicableCoupons: string;
  image: string;
  lessons: [];
  totalTime: string;
  enrolled: boolean;
}

export interface CourseOverview {
  id: string;
  level: string;
  studentCount: number;
  startDate: string;
  startTime: string;
  description: string;
}

export interface CourseAbout {
  id: string;
  description: string;
}


export interface CourseResources {
  id: string;
  files: File[];
}
export interface File {
  id: string;
  name: string;
  type: string;
  size: string;
  downloadUrl: string;
  thumbnail: string; // thumbnail image of file
}


export interface CourseDiscussion {
  id: string;
  discussions: Discussion[];
}
export interface Discussion {
  postId: string;
  creatorName: string;
  creatorId: string;
  creatorImage: string;
  timeCreated: string;
  text: string;
  replies: Replies[];
}
export interface Replies {
  postid: string;
  creatorId: string;
  creatorName: string;
  creatorImage: string;
  timeCreated: string;
  text: string;
}


export interface CourseReviews {
  id: string;
  reviews: Review[];
}
export interface Review {
  reviewId: string;
  userId: string;
  username: string;
  userImage: string;
  status: boolean; // exceeded my expectation || scope for improvement
  timestamp: string;
}
