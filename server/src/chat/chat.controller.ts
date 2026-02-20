import { Controller, Post, Body } from '@nestjs/common'
import { ChatService } from './chat.service'

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // 智能问答接口
  @Post('search')
  async searchAndAnswer(@Body() body: { question: string }) {
    const { question } = body

    if (!question || question.trim() === '') {
      return {
        code: 400,
        msg: '请输入问题',
        data: null
      }
    }

    try {
      const result = await this.chatService.searchAndAnswer(question)
      return {
        code: 200,
        msg: 'success',
        data: result
      }
    } catch (error) {
      return {
        code: 500,
        msg: error.message,
        data: null
      }
    }
  }
}
