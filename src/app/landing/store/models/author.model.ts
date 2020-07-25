export interface Author {
  id: string;
  image: string; // thumbnail
  name: string;
  about: string; // 80 chars
  tags: string[]; // instructor | top instructor | best seller | verified
  description: string;
  url: string;
}
