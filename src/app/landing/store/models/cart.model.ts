export interface CartItems {
  courses: CourseMin[];
}

export interface CourseMin {
  id: string;
  name: string;
  image: string;
  authorName: string;
  startDate: string;
  price: number;
}
