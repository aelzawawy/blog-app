import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog } from '@prisma/client';
import { NewBlogDto } from 'src/dtos/new-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  async getBlogs(authorId: number): Promise<Blog[]> {
    const blogs = await this.prisma.blog.findMany({
      where: { authorId },
    });
    return blogs;
  }

  async createBlog(data: NewBlogDto, authorId: number) {
    const { title, content } = data;
    const blog = await this.prisma.blog.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    return blog
  }

  async getBlogById(id:number) {
    const blog = await this.prisma.blog.findUnique({where:{id}}) 
    if(!blog){
      throw new NotFoundException()
    }
    return blog
  }

  async delBlog(id:number) {
    const blog = await this.prisma.blog.delete({where:{id}}) 
    if(!blog){
      throw new NotFoundException()
    }
    return blog
  }
}
