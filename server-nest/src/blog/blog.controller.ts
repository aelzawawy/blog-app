import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { type Request } from 'express';
import { NewBlogDto } from 'src/dtos/new-blog.dto';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { BlogService } from './blog.service';
import { BlogCacheInterceptor } from './blog-cache.interceptor';

@Controller('/api/blog')
@UseGuards(AuthenticatedGuard)
@UseInterceptors(BlogCacheInterceptor)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/')
  async blogs(@Req() req: Request) {
    const blogs = await this.blogService.getBlogs(req.user!.id);
    return { blogs };
  }

  @Post('/')
  async newBlog(@Req() req: Request, @Body() body: NewBlogDto) {
    const blog = await this.blogService.createBlog(
      body,
      req.user!.id,
    );
    return { blog };
  }

  @Get(':id')
  async blogById(@Param('id', ParseIntPipe) id: number) {
    const blog = await this.blogService.getBlogById(id);
    return { blog };
  }

  @Delete(':id')
  async delBlog(@Param('id', ParseIntPipe) id: number) {
    const blog = await this.blogService.delBlog(id);
    return { blog };
  }
}
