export interface WishlistItems {
  courses: Wishlist[];
}

export interface Wishlist {
  id: string;
  name: string;
  image: string;
  authorName: string;
  startDate: string;
  price: number;
}
