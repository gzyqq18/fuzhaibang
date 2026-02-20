import { Injectable } from '@nestjs/common'
import { getSupabaseClient } from '../storage/database/supabase-client'

@Injectable()
export class KnowledgeService {
  async getCategories() {
    const client = getSupabaseClient()
    const { data, error } = await client
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) {
      throw new Error(`获取分类失败: ${error.message}`)
    }

    return data
  }

  async getContentsByCategory(categoryId: number) {
    const client = getSupabaseClient()
    const { data, error } = await client
      .from('contents')
      .select('*')
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`获取内容失败: ${error.message}`)
    }

    return data
  }

  async getContentById(id: number, userId?: string) {
    const client = getSupabaseClient()

    // 获取内容详情
    const { data: content, error } = await client
      .from('contents')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw new Error(`获取内容失败: ${error.message}`)
    }

    // 如果不是免费内容，检查是否已解锁
    let unlocked = content.is_free
    if (!content.is_free && userId) {
      const { data: unlockRecord } = await client
        .from('unlock_records')
        .select('*')
        .eq('user_id', userId)
        .eq('content_id', id)
        .single()

      unlocked = !!unlockRecord
    }

    return {
      ...content,
      unlocked
    }
  }

  async searchContents(keyword: string) {
    const client = getSupabaseClient()
    const { data, error } = await client
      .from('contents')
      .select('*')
      .ilike('title', `%${keyword}%`)
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) {
      throw new Error(`搜索内容失败: ${error.message}`)
    }

    return data
  }

  async createCategory(data: { name: string; icon: string; sortOrder?: number }) {
    const client = getSupabaseClient()
    const { data: category, error } = await client
      .from('categories')
      .insert({
        name: data.name,
        icon: data.icon,
        sort_order: data.sortOrder ?? 0
      })
      .select()
      .single()

    if (error) {
      throw new Error(`创建分类失败: ${error.message}`)
    }

    return category
  }

  async createContent(data: {
    categoryId: number
    title: string
    preview: string
    content: string
    isFree?: boolean
  }) {
    const client = getSupabaseClient()
    const { data: content, error } = await client
      .from('contents')
      .insert({
        category_id: data.categoryId,
        title: data.title,
        preview: data.preview,
        content: data.content,
        is_free: data.isFree ?? false
      })
      .select()
      .single()

    if (error) {
      throw new Error(`创建内容失败: ${error.message}`)
    }

    return content
  }

  async recordUnlock(userId: string, contentId: number) {
    const client = getSupabaseClient()

    // 检查是否已解锁
    const { data: existing } = await client
      .from('unlock_records')
      .select('*')
      .eq('user_id', userId)
      .eq('content_id', contentId)
      .single()

    if (existing) {
      return { message: '已经解锁过' }
    }

    // 创建解锁记录
    const { error } = await client
      .from('unlock_records')
      .insert({
        user_id: userId,
        content_id: contentId
      })

    if (error) {
      throw new Error(`记录解锁失败: ${error.message}`)
    }

    return { message: '解锁成功' }
  }

  async checkUnlockStatus(userId: string, contentId: number) {
    const client = getSupabaseClient()
    const { data } = await client
      .from('unlock_records')
      .select('*')
      .eq('user_id', userId)
      .eq('content_id', contentId)
      .single()

    return { unlocked: !!data }
  }
}
