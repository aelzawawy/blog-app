import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { type Request, type Response } from 'express';
import { NewBlogDto } from 'src/dtos/new-blog.dto';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { BlogService } from './blog.service';

@Controller('/api/blog')
@UseGuards(AuthenticatedGuard)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/')
  async blogs(@Req() req: Request, @Res() res: Response) {
    if (!req.user) {
      return res.redirect('/auth/google');
    }
    const blogs = await this.blogService.getBlogs(req.user.id);
    res.send({ blogs });
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
