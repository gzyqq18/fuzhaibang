import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common'
import { KnowledgeService } from './knowledge.service'

@Controller('knowledge')
export class KnowledgeController {
  constructor(private readonly knowledgeService: KnowledgeService) {}

  // 获取所有分类
  @Get('categories')
  async getCategories() {
    const categories = await this.knowledgeService.getCategories()
    return {
      code: 200,
      msg: 'success',
      data: categories
    }
  }

  // 根据分类ID获取内容列表
  @Get('categories/:categoryId/contents')
  async getContentsByCategory(@Param('categoryId') categoryId: string) {
    const contents = await this.knowledgeService.getContentsByCategory(parseInt(categoryId))
    return {
      code: 200,
      msg: 'success',
      data: contents
    }
  }

  // 获取内容详情
  @Get('contents/:id')
  async getContentById(@Param('id') id: string, @Query('userId') userId?: string) {
    const content = await this.knowledgeService.getContentById(parseInt(id), userId)
    return {
      code: 200,
      msg: 'success',
      data: content
    }
  }

  // 搜索内容
  @Get('search')
  async searchContents(@Query('keyword') keyword: string) {
    const contents = await this.knowledgeService.searchContents(keyword)
    return {
      code: 200,
      msg: 'success',
      data: contents
    }
  }

  // 创建分类（管理接口）
  @Post('categories')
  async createCategory(@Body() body: { name: string; icon: string; sortOrder?: number }) {
    const category = await this.knowledgeService.createCategory(body)
    return {
      code: 200,
      msg: 'success',
      data: category
    }
  }

  // 创建内容（管理接口）
  @Post('contents')
  async createContent(@Body() body: {
    categoryId: number
    title: string
    preview: string
    content: string
    isFree?: boolean
  }) {
    const content = await this.knowledgeService.createContent(body)
    return {
      code: 200,
      msg: 'success',
      data: content
    }
  }

  // 记录解锁
  @Post('unlock')
  async recordUnlock(@Body() body: { userId: string; contentId: number }) {
    const result = await this.knowledgeService.recordUnlock(body.userId, body.contentId)
    return {
      code: 200,
      msg: 'success',
      data: result
    }
  }

  // 检查解锁状态
  @Get('unlock/status')
  async checkUnlockStatus(@Query('userId') userId: string, @Query('contentId') contentId: string) {
    const result = await this.knowledgeService.checkUnlockStatus(userId, parseInt(contentId))
    return {
      code: 200,
      msg: 'success',
      data: result
    }
  }
}
