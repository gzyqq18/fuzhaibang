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

      // 1. 从知识库中搜索相关内容
      const client = getSupabaseClient()
      const { data: matchedContents, error: searchError } = await client
        .from('contents')
        .select('*')
        .ilike('title', `%${question}%`)
        .order('created_at', { ascending: false })
        .limit(5)

      if (searchError) {
        console.error('搜索内容失败:', searchError)
      }

      console.log('搜索到的内容数量:', matchedContents?.length || 0)

      // 2. 构建知识库上下文
      let knowledgeContext = ''
      if (matchedContents && matchedContents.length > 0) {
        knowledgeContext = '\n\n参考知识库内容：\n' +
          matchedContents.map((content, index) =>
            `${index + 1}. ${content.title}\n${content.preview}`
          ).join('\n\n')
      }

      // 3. 调用 LLM 生成回答
      const systemPrompt = `你是一位专业的债务咨询顾问，专门帮助负债人解决债务问题。
你的职责：
1. 理解用户的问题，提供专业、实用的建议
2. 基于知识库内容给出准确答案
3. 回答要简洁明了，步骤清晰
4. 保持专业、温暖、理解的语气
5. 如果问题超出知识库范围，要诚实告知用户${knowledgeContext}

请用中文回答。`

      const messages = [
        { role: 'system' as const, content: systemPrompt },
        { role: 'user' as const, content: question }
      ]

      console.log('开始调用 LLM...')
      const llmResponse = await this.llmClient.invoke(messages, {
        temperature: 0.7
      })
      console.log('LLM 响应:', llmResponse)

      // 4. 计算匹配度（简化版，实际可以使用更复杂的相似度算法）
      const contentWithRelevance = await Promise.all(
        (matchedContents || []).map(async (content) => ({
          id: content.id,
          title: content.title,
          preview: content.preview,
          category: await this.getCategoryName(content.category_id),
          relevance: this.calculateRelevance(question, content.title)
        }))
      )

      console.log('处理后的匹配内容:', contentWithRelevance)

      return {
        answer: llmResponse.content,
        matchedContents: contentWithRelevance
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
