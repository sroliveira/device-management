import { Category } from "../categories/category.model";

export interface Device {
  id: number;
  category: Category;
  color: string;
  partnumber: number;
}
