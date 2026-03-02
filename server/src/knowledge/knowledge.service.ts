import { Injectable } from '@nestjs/common'
import { getSupabaseClient } from '../storage/database/supabase-client'

@Injectable()
export class KnowledgeService {
  async getCategories() {
    // 返回模拟分类数据
    return [
      { id: 1, name: '债务管理', icon: '💰', sort_order: 1 },
      { id: 2, name: '心理疏导', icon: '🧠', sort_order: 2 },
      { id: 3, name: '法律知识', icon: '⚖️', sort_order: 3 },
      { id: 4, name: '资源导航', icon: '📋', sort_order: 4 }
    ]
  }

  async getContentsByCategory(categoryId: number) {
    // 返回模拟内容数据
    const mockContents = {
      1: [ // 债务管理
        { id: 1, category_id: 1, title: '如何制定债务还款计划', preview: '制定合理的债务还款计划是解决债务问题的第一步...', content: '详细内容...', is_free: true, created_at: new Date().toISOString() },
        { id: 2, category_id: 1, title: '债务重组的条件和流程', preview: '债务重组是解决严重债务问题的有效方法...', content: '详细内容...', is_free: false, created_at: new Date().toISOString() }
      ],
      2: [ // 心理疏导
        { id: 3, category_id: 2, title: '负债人的心理调节方法', preview: '负债会带来很大的心理压力，学会调节很重要...', content: '详细内容...', is_free: true, created_at: new Date().toISOString() },
        { id: 4, category_id: 2, title: '如何保持积极心态', preview: '积极的心态是度过债务危机的关键...', content: '详细内容...', is_free: true, created_at: new Date().toISOString() }
      ],
      3: [ // 法律知识
        { id: 5, category_id: 3, title: '信用卡逾期的法律后果', preview: '了解信用卡逾期可能带来的法律风险...', content: '详细内容...', is_free: true, created_at: new Date().toISOString() },
        { id: 6, category_id: 3, title: '催收行为的法律边界', preview: '了解催收行为的合法与非法界限...', content: '详细内容...', is_free: true, created_at: new Date().toISOString() }
      ],
      4: [ // 资源导航
        { id: 7, category_id: 4, title: '免费法律援助资源', preview: '为负债人提供的免费法律援助资源汇总...', content: '详细内容...', is_free: true, created_at: new Date().toISOString() },
        { id: 8, category_id: 4, title: '债务咨询服务推荐', preview: '值得信赖的债务咨询服务机构推荐...', content: '详细内容...', is_free: false, created_at: new Date().toISOString() }
      ]
    }
    return mockContents[categoryId] || []
  }

  async getContentById(id: number, userId?: string) {
    // 返回模拟内容详情
    const mockContent = {
      id,
      category_id: 1,
      title: '如何制定债务还款计划',
      preview: '制定合理的债务还款计划是解决债务问题的第一步...',
      content: '详细内容：\n1. 列出所有债务\n2. 计算总债务金额\n3. 制定还款优先级\n4. 设定每月还款金额\n5. 定期调整计划',
      is_free: true,
      created_at: new Date().toISOString()
    }
    return {
      ...mockContent,
      unlocked: mockContent.is_free || !!userId
    }
  }

  async searchContents(keyword: string) {
    // 返回模拟搜索结果
    return [
      { id: 1, category_id: 1, title: '如何制定债务还款计划', preview: '制定合理的债务还款计划是解决债务问题的第一步...', content: '详细内容...', is_free: true, created_at: new Date().toISOString() },
      { id: 3, category_id: 2, title: '负债人的心理调节方法', preview: '负债会带来很大的心理压力，学会调节很重要...', content: '详细内容...', is_free: true, created_at: new Date().toISOString() }
    ]
  }

  async createCategory(data: { name: string; icon: string; sortOrder?: number }) {
    // 模拟创建分类
    return {
      id: Math.floor(Math.random() * 1000),
      name: data.name,
      icon: data.icon,
      sort_order: data.sortOrder ?? 0
    }
  }

  async createContent(data: {
    categoryId: number
    title: string
    preview: string
    content: string
    isFree?: boolean
  }) {
    // 模拟创建内容
    return {
      id: Math.floor(Math.random() * 1000),
      category_id: data.categoryId,
      title: data.title,
      preview: data.preview,
      content: data.content,
      is_free: data.isFree ?? false,
      created_at: new Date().toISOString()
    }
  }

  async recordUnlock(userId: string, contentId: number) {
    // 模拟解锁记录
    return { message: '解锁成功' }
  }

  async checkUnlockStatus(userId: string, contentId: number) {
    // 模拟检查解锁状态
    return { unlocked: true }
  }
}
