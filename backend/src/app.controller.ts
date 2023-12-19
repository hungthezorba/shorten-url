import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService, CreateUrlDto } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  async getUrl(@Param() params: { id: string }): Promise<{ url: string }> {
    return {
      url: await this.appService.getUrl({ key: params.id }),
    };
  }

  @Post()
  createUrl(@Body() createUrlDto: CreateUrlDto): { hash: string } {
    return {
      hash: this.appService.createUrl(createUrlDto),
    };
  }
}
