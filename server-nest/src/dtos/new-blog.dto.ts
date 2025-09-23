import { IsNotEmpty } from "class-validator";

export class NewBlogDto{
  @IsNotEmpty()
  title: string
  @IsNotEmpty()
  content: string
}