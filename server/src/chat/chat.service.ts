import { Injectable } from '@nestjs/common'
import { LLMClient, Config } from 'coze-coding-dev-sdk'
import { getSupabaseClient } from '../storage/database/supabase-client'

@Injectable()
export class ChatService {
  private llmClient: LLMClient

  constructor() {
    this.llmClient = new LLMClient(new Config())
  }

  async searchAndAnswer(question: string) {
    try {
      console.log('开始智能问答，问题:', question)

      // 模拟LLM响应，返回固定回答
      const mockAnswer = `针对您的问题"${question}"，以下是一些建议：

1. 制定详细的债务还款计划
2. 优先偿还高利息债务
3. 考虑债务重组或协商
4. 增加收入来源
5. 控制日常开支

如果您需要更具体的建议，请提供更多详细信息。`

      console.log('返回模拟回答:', mockAnswer)

      return {
        answer: mockAnswer,
        matchedContents: []
      }
    } catch (error) {
      console.error('智能问答失败:', error)
      console.error('错误详情:', {
        message: error.message,
        stack: error.stack
      })

      // 返回友好的错误信息
      return {
        answer: '抱歉，暂时无法回答您的问题。请稍后重试，或者尝试使用其他问题。',
        matchedContents: []
      }
    }
  }

  private async getCategoryName(categoryId: number): Promise<string> {
    try {
      const client = getSupabaseClient()
      const { data } = await client
        .from('categories')
        .select('name')
        .eq('id', categoryId)
        .single()

      return data?.name || '未知分类'
    } catch {
      return '未知分类'
    }
  }

  private calculateRelevance(question: string, title: string): number {
    // 简化的相似度计算 - 使用关键词匹配
    const questionLower = question.toLowerCase()
    const titleLower = title.toLowerCase()

    // 提取关键词（按空格或标点分割）
    const keywords = questionLower
      .split(/[\s，。？！、；：""'']/)
      .filter(k => k.length > 1) // 忽略单个字符

    if (keywords.length === 0) {
      return 50 // 默认匹配度
    }

    let matchCount = 0
    keywords.forEach(keyword => {
      if (titleLower.includes(keyword)) {
        matchCount++
      }
    })

    const relevance = Math.min(Math.round((matchCount / keywords.length) * 100), 100)

    // 至少返回 30% 的匹配度，保证有内容展示
    return Math.max(relevance, 30)
  }
}
