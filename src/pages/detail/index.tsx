import { View, Text, Button } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState, useEffect, useCallback, useRef } from 'react'
import type { FC } from 'react'

interface ContentDetail {
  id: number
  title: string
  preview: string
  content: string
  category: string
  is_free: boolean
  unlocked: boolean
}

// 内置内容数据
const getBuiltInContent = (contentId: number): ContentDetail => {
  const contentMap: Record<number, ContentDetail> = {
    1: {
      id: 1,
      title: '债务重组流程指南',
      preview: '债务重组是指债务人无法按时偿还债务时，通过与债权人协商，重新安排债务的还款计划。债务重组可以帮助债务人减轻还款压力，避免破产。债务重组的主要方式包括...',
      content: '债务重组流程指南\n\n债务重组是指债务人无法按时偿还债务时，通过与债权人协商，重新安排债务的还款计划。债务重组可以帮助债务人减轻还款压力，避免破产。\n\n债务重组的主要方式：\n\n1. 延期还款：将债务的还款期限延长，降低每期的还款金额。\n\n2. 减免部分债务：与债权人协商，减免部分本金或利息。\n\n3. 以资抵债：以资产抵偿债务。\n\n4. 债转股：将债务转换为股权。\n\n债务重组的步骤：\n\n第一步：评估财务状况\n- 详细列出所有债务和资产\n- 计算可支配收入\n- 制定还款计划\n\n第二步：与债权人沟通\n- 主动联系债权人\n- 说明当前困难\n- 提出重组方案\n\n第三步：签署协议\n- 达成一致后签署协议\n- 按照协议执行\n\n第四步：监督执行\n- 定期检查还款进度\n- 及时调整还款计划\n\n注意事项：\n- 保持诚实沟通\n- 遵守协议约定\n- 建立良好信用记录',
      category: '债务管理',
      is_free: false,
      unlocked: false
    },
    2: {
      id: 2,
      title: '如何与催收人员沟通',
      preview: '面对催收人员的电话或上门催收，保持冷静和理性非常重要。合理的沟通可以帮助你更好地处理债务问题，避免不必要的冲突和误会...',
      content: '如何与催收人员沟通\n\n面对催收人员的电话或上门催收，保持冷静和理性非常重要。合理的沟通可以帮助你更好地处理债务问题，避免不必要的冲突和误会。\n\n沟通原则：\n\n1. 保持冷静\n- 不要情绪激动\n- 不要辱骂对方\n- 保持礼貌和尊重\n\n2. 了解自己的权利\n- 催收人员不能使用暴力或威胁\n- 不能在非工作时间频繁骚扰\n- 不能向无关人员透露你的债务情况\n\n3. 诚实面对\n- 承认债务事实\n- 说明当前困难\n- 表达还款意愿\n\n4. 记录沟通内容\n- 记录通话时间\n- 记录对方姓名\n- 保留沟通凭证\n\n沟通技巧：\n\n1. 主动联系\n- 主动向债权人说明情况\n- 不要回避催收电话\n- 保持定期沟通\n\n2. 提供解决方案\n- 提出合理的还款计划\n- 说明还款来源和时间\n- 请求对方的理解\n\n3. 请求宽限期\n- 如果暂时无法还款，可以请求宽限期\n- 说明宽限期的理由\n- 承诺在宽限期内解决问题\n\n4. 寻求第三方帮助\n- 可以请律师或债务咨询机构协助沟通\n- 第三方可以更客观地评估情况\n- 避免情绪化沟通\n\n注意事项：\n- 不要同意不合理的还款计划\n- 保留所有沟通记录\n- 必要时寻求法律援助',
      category: '债务管理',
      is_free: false,
      unlocked: false
    },
    3: {
      id: 3,
      title: '信用卡逾期处理指南',
      preview: '信用卡逾期后会产生高额的罚息和滞纳金，严重影响个人信用记录。及时处理逾期问题非常重要。以下是信用卡逾期的处理方法...',
      content: '信用卡逾期处理指南\n\n信用卡逾期后会产生高额的罚息和滞纳金，严重影响个人信用记录。及时处理逾期问题非常重要。\n\n逾期后果：\n\n1. 产生高额罚息和滞纳金\n- 逾期利息通常按日计算\n- 滞纳金一般为最低还款额的5%\n- 长期逾期会产生巨额利息\n\n2. 影响个人信用记录\n- 逾期记录会保留5年\n- 影响未来贷款和信用卡申请\n- 可能影响就业和生活\n\n3. 可能被起诉\n- 银行有权向法院起诉\n- 可能被强制执行\n- 严重者可能承担刑事责任\n\n处理方法：\n\n第一步：立即停止消费\n- 停止使用信用卡\n- 停止新增债务\n- 优先偿还信用卡债务\n\n第二步：计算总债务\n- 统计所有信用卡债务\n- 计算每月还款总额\n- 评估还款能力\n\n第三步：与银行协商\n- 主动联系银行\n- 说明当前困难\n- 申请分期还款或减免利息\n\n第四步：制定还款计划\n- 根据收入情况制定还款计划\n- 优先偿还高利息债务\n- 定期检查还款进度\n\n预防措施：\n- 合理使用信用卡\n- 不要超出还款能力\n- 设置还款提醒\n- 定期检查账单',
      category: '债务管理',
      is_free: true,
      unlocked: true
    },
    4: {
      id: 4,
      title: '负债后的心理调适',
      preview: '负债后产生焦虑、抑郁、自责等负面情绪是正常的。学会调适心态，积极面对困难，是走出债务困境的第一步...',
      content: '负债后的心理调适\n\n负债后产生焦虑、抑郁、自责等负面情绪是正常的。学会调适心态，积极面对困难，是走出债务困境的第一步。\n\n常见的负面情绪：\n\n1. 焦虑和恐惧\n- 担心未来无法偿还\n- 恐惧催收和法律后果\n- 担心家人和朋友的看法\n\n2. 自责和内疚\n- 责怪自己无法承担债务\n- 感到对不起家人\n- 自尊心受挫\n\n3. 抑郁和绝望\n- 感到前途渺茫\n- 失去生活信心\n- 甚至产生极端想法\n\n心理调适方法：\n\n1. 接受现实\n- 承认自己的债务状况\n- 不要逃避或否认\n- 接受这是一个暂时性的困难\n\n2. 积极自我对话\n- 不要过度自责\n- 告诉自己这不是终点\n- 相信自己有能力解决\n\n3. 寻求支持\n- 与家人和朋友沟通\n- 寻求专业心理咨询\n- 加入债务互助小组\n\n4. 保持健康生活\n- 规律作息\n- 适当运动\n- 培养兴趣爱好\n\n5. 设定小目标\n- 制定短期可实现的目标\n- 逐步建立信心\n- 庆祝每一个小进步\n\n注意事项：\n- 如果情绪严重影响生活，一定要寻求专业帮助\n- 不要因为债务而放弃生活\n- 记住，债务问题是可以解决的',
      category: '心理疏导',
      is_free: false,
      unlocked: false
    },
    5: {
      id: 5,
      title: '如何与家人沟通债务问题',
      preview: '债务问题不仅影响个人，也会影响家庭关系。与家人诚实沟通，寻求理解和支持，对于解决债务问题非常重要...',
      content: '如何与家人沟通债务问题\n\n债务问题不仅影响个人，也会影响家庭关系。与家人诚实沟通，寻求理解和支持，对于解决债务问题非常重要。\n\n沟通的重要性：\n\n1. 获得理解和支持\n- 家人的理解可以减轻心理压力\n- 家人的支持可以提供实际帮助\n- 避免因隐瞒而产生更大的误会\n\n2. 共同面对困难\n- 债务问题不是一个人的事\n- 家庭成员可以共同分担\n- 集思广益寻找解决方案\n\n3. 建立信任关系\n- 诚实沟通可以重建信任\n- 避免因隐瞒而产生更大的危机\n- 建立良好的家庭沟通习惯\n\n沟通技巧：\n\n1. 选择合适的时机\n- 等待情绪稳定时\n- 选择轻松的环境\n- 避免在争吵时沟通\n\n2. 诚实面对\n- 如实说明债务情况\n- 不要隐瞒或美化\n- 承担自己的责任\n\n3. 表达需求和期望\n- 说明自己需要什么样的支持\n- 不要指责或抱怨\n- 尊重对方的感受\n\n4. 制定解决方案\n- 共同讨论解决方案\n- 明确各自的职责\n- 建立监督和反馈机制\n\n注意事项：\n- 做好家人可能会反应激烈的心理准备\n- 保持耐心和理解\n- 不要期望一次沟通就能解决所有问题\n- 定期沟通，及时更新进展',
      category: '心理疏导',
      is_free: false,
      unlocked: false
    },
    6: {
      id: 6,
      title: '负债后的压力管理',
      preview: '负债后面临巨大的经济和心理压力。学会管理压力，保持良好的心理状态，对于解决问题和保持健康都非常重要...',
      content: '负债后的压力管理\n\n负债后面临巨大的经济和心理压力。学会管理压力，保持良好的心理状态，对于解决问题和保持健康都非常重要。\n\n压力的来源：\n\n1. 经济压力\n- 担心无法偿还债务\n- 收入不足覆盖支出\n- 生活质量下降\n\n2. 社会压力\n- 担心他人知道债务情况\n- 面对催收的压力\n- 社会关系紧张\n\n3. 心理压力\n- 焦虑和恐惧\n- 自责和内疚\n- 抑郁和绝望\n\n压力管理方法：\n\n1. 识别压力源\n- 明确压力的具体来源\n- 分析哪些是可以控制的\n- 优先解决可以控制的问题\n\n2. 放松训练\n- 深呼吸练习\n- 冥想和正念\n- 渐进式肌肉放松\n\n3. 时间管理\n- 制定合理的计划\n- 分解大任务为小任务\n- 合理分配时间和精力\n\n4. 运动和健康饮食\n- 规律运动可以缓解压力\n- 健康饮食有助于保持精力\n- 避免过度饮酒和吸烟\n\n5. 寻求专业帮助\n- 必要时寻求心理咨询\n- 参加压力管理课程\n- 学习应对技巧\n\n注意事项：\n- 不要忽视压力的信号\n- 适时寻求帮助不是软弱的表现\n- 压力管理是一个持续的过程',
      category: '心理疏导',
      is_free: true,
      unlocked: true
    },
    7: {
      id: 7,
      title: '债务纠纷的法律途径',
      preview: '当债务纠纷无法通过协商解决时，可以考虑通过法律途径解决。了解相关的法律知识和程序，可以帮助你更好地保护自己的权益...',
      content: '债务纠纷的法律途径\n\n当债务纠纷无法通过协商解决时，可以考虑通过法律途径解决。了解相关的法律知识和程序，可以帮助你更好地保护自己的权益。\n\n常见的法律途径：\n\n1. 协商和解\n- 最简单、成本最低的方式\n- 双方达成一致后签署协议\n- 需要双方都有诚意\n\n2. 调解\n- 通过第三方调解机构调解\n- 调解协议具有法律效力\n- 成本相对较低\n\n3. 仲裁\n- 双方同意通过仲裁解决\n- 仲裁裁决具有法律效力\n- 仲裁程序相对快速\n\n4. 诉讼\n- 向法院提起诉讼\n- 判决具有强制执行力\n- 成本较高，时间较长\n\n诉讼流程：\n\n第一步：准备材料\n- 起诉状\n- 证据材料\n- 身份证明\n\n第二步：立案\n- 向法院提交材料\n- 法院审核立案\n- 缴纳诉讼费\n\n第三步：开庭审理\n- 法庭调查\n- 法庭辩论\n- 法庭调解\n\n第四步：判决\n- 法院作出判决\n- 双方收到判决书\n- 如不服可以上诉\n\n注意事项：\n- 保留所有相关证据\n- 尽早寻求专业法律帮助\n- 了解诉讼时效\n- 注意保存相关文件',
      category: '法律知识',
      is_free: false,
      unlocked: false
    },
    8: {
      id: 8,
      title: '个人破产制度的了解',
      preview: '个人破产制度是帮助诚实但不幸的债务人重新开始的法律制度。了解个人破产制度，可以帮助你在必要时寻求法律保护...',
      content: '个人破产制度的了解\n\n个人破产制度是帮助诚实但不幸的债务人重新开始的法律制度。了解个人破产制度，可以帮助你在必要时寻求法律保护。\n\n什么是个人破产：\n\n个人破产是指债务人不能清偿到期债务，并且资产不足以清偿全部债务或者明显缺乏清偿能力时，通过法律程序清理债务、重新开始。\n\n个人破产的条件：\n\n1. 不能清偿到期债务\n- 有已经到期的债务无法偿还\n- 债权人已经催收\n- 债务人明确表示无法偿还\n\n2. 资产不足以清偿全部债务\n- 所有资产价值低于债务总额\n- 债务人的收入不足以偿还债务\n- 明显缺乏清偿能力\n\n3. 诚实而不幸\n- 债务是由于正当原因产生的\n- 没有恶意逃避债务的行为\n- 积极配合破产程序\n\n个人破产的程序：\n\n第一步：申请破产\n- 向法院提交破产申请书\n- 提交相关证明材料\n- 缴纳申请费\n\n第二步：法院审查\n- 法院审查申请材料\n- 举行债权人会议\n- 法院作出是否受理的决定\n\n第三步：破产清算\n- 清理债务人的资产\n- 制定破产清算方案\n- 按照法律顺序清偿债务\n\n第四步：破产免责\n- 债务人获得免责\n- 恢复正常的民事权利\n- 重新开始\n\n注意事项：\n- 个人破产制度在我国还处于试点阶段\n- 不是所有地区都适用\n- 需要专业的法律帮助',
      category: '法律知识',
      is_free: false,
      unlocked: false
    },
    9: {
      id: 9,
      title: '债务纠纷中的证据保存',
      preview: '在债务纠纷中，证据是保护自己权益的重要武器。了解需要保存哪些证据，以及如何保存证据，可以帮助你在必要时维护自己的权益...',
      content: '债务纠纷中的证据保存\n\n在债务纠纷中，证据是保护自己权益的重要武器。了解需要保存哪些证据，以及如何保存证据，可以帮助你在必要时维护自己的权益。\n\n重要的证据类型：\n\n1. 借款合同或借条\n- 明确借款金额\n- 明确借款利率\n- 明确还款期限\n- 双方签字或盖章\n\n2. 还款记录\n- 银行转账记录\n- 微信、支付宝转账记录\n- 还款凭证\n\n3. 催收记录\n- 催收电话录音\n- 催收短信\n- 催收邮件\n\n4. 协商记录\n- 协商会议纪要\n- 协商协议\n- 相关邮件和短信\n\n证据保存方法：\n\n1. 及时保存\n- 发生相关事件后立即保存\n- 不要依赖记忆\n- 定期整理备份\n\n2. 分类整理\n- 按照时间顺序整理\n- 按照类型分类\n- 制作证据目录\n\n3. 多重备份\n- 纸质和电子版都保存\n- 云端和本地都备份\n- 定期检查备份完整性\n\n4. 规范命名\n- 使用清晰的文件名\n- 包含时间、事件等信息\n- 方便查找和使用\n\n注意事项：\n- 证据必须真实合法\n- 不要伪造或篡改证据\n- 保留原始证据\n- 必要时进行公证',
      category: '法律知识',
      is_free: true,
      unlocked: true
    }
  }

  return contentMap[contentId] || null
}

const DetailPage: FC = () => {
  const [contentId, setContentId] = useState<number | null>(null)
  const [content, setContent] = useState<ContentDetail | null>(null)
  const [showAdModal, setShowAdModal] = useState(false)
  const [isPlayingAd, setIsPlayingAd] = useState(false)

  // 激励视频广告实例
  const rewardedVideoAd = useRef<any>(null)

  useLoad((options) => {
    const { id } = options
    if (id) {
      setContentId(parseInt(id))
    }
  })

  // 初始化激励视频广告
  useEffect(() => {
    const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP

    if (isWeapp) {
      try {
        // 创建激励视频广告实例
        rewardedVideoAd.current = Taro.createRewardedVideoAd({
          adUnitId: 'n5yyapes8ozdabvmi0'
        })

        // 监听广告加载
        rewardedVideoAd.current.onLoad(() => {
          console.log('激励视频广告加载成功')
        })

        // 监听广告加载失败
        rewardedVideoAd.current.onError((err: any) => {
          console.error('激励视频广告加载失败:', err)
          setIsPlayingAd(false)
          Taro.showToast({
            title: '广告加载失败，请重试',
            icon: 'none'
          })
        })

        // 监听广告关闭
        rewardedVideoAd.current.onClose((res: any) => {
          console.log('激励视频广告关闭, isEnded:', res && res.isEnded)

          if (res && res.isEnded) {
            // 用户看完广告
            console.log('用户完整观看广告')
            handleUnlockSuccess()
          } else {
            // 用户中途退出
            console.log('用户中途退出广告')
            setIsPlayingAd(false)
            Taro.showToast({
              title: '请完整观看广告才能解锁',
              icon: 'none',
              duration: 2000
            })
          }
        })
      } catch (error) {
        console.error('创建激励视频广告失败:', error)
      }
    }

    // 清理
    return () => {
      if (rewardedVideoAd.current) {
        rewardedVideoAd.current.offLoad()
        rewardedVideoAd.current.offError()
        rewardedVideoAd.current.offClose()
      }
    }
  }, [])

  const loadContentDetail = useCallback(() => {
    if (!contentId) return

    try {
      // 从内置数据获取内容
      const builtInContent = getBuiltInContent(contentId)

      if (!builtInContent) {
        Taro.showToast({
          title: '内容不存在',
          icon: 'none'
        })
        return
      }

      // 检查本地存储的解锁状态
      const unlockedContents = Taro.getStorageSync('unlocked_contents') || []
      const isUnlocked = unlockedContents.includes(contentId)

      console.log('内容详情:', builtInContent)
      console.log('解锁状态:', isUnlocked)

      setContent({
        ...builtInContent,
        unlocked: isUnlocked
      })
    } catch (error) {
      console.error('加载内容失败:', error)
      Taro.showToast({
        title: '加载失败',
        icon: 'none'
      })
    }
  }, [contentId])

  useEffect(() => {
    if (contentId) {
      loadContentDetail()
    }
  }, [contentId, loadContentDetail])

  const handleShowAd = async () => {
    if (!contentId) return

    const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP

    if (!isWeapp) {
      Taro.showToast({
        title: '广告功能仅在小程序中可用',
        icon: 'none'
      })
      return
    }

    if (!rewardedVideoAd.current) {
      Taro.showToast({
        title: '广告加载中，请稍后',
        icon: 'none'
      })
      return
    }

    try {
      setIsPlayingAd(true)
      setShowAdModal(false)

      // 显示激励视频广告
      await rewardedVideoAd.current.show()
      console.log('激励视频广告已显示')
    } catch (error) {
      console.error('显示激励视频广告失败:', error)
      setIsPlayingAd(false)
      Taro.showToast({
        title: '广告显示失败，请重试',
        icon: 'none'
      })
    }
  }

  const handleUnlockSuccess = () => {
    if (!contentId) return

    try {
      // 保存解锁状态到本地存储
      const unlockedContents = Taro.getStorageSync('unlocked_contents') || []
      if (!unlockedContents.includes(contentId)) {
        unlockedContents.push(contentId)
        Taro.setStorageSync('unlocked_contents', unlockedContents)
      }

      Taro.showToast({
        title: '解锁成功',
        icon: 'success'
      })

      // 刷新内容详情
      loadContentDetail()
    } catch (error) {
      console.error('解锁失败:', error)
      Taro.showToast({
        title: '解锁失败',
        icon: 'none'
      })
    } finally {
      setIsPlayingAd(false)
    }
  }

  const handleCloseModal = () => {
    if (isPlayingAd) {
      Taro.showToast({
        title: '请先看完广告',
        icon: 'none'
      })
      return
    }
    setShowAdModal(false)
  }

  const handleGoBack = () => {
    Taro.navigateBack()
  }

  if (!content) {
    return (
      <View className="flex items-center justify-center min-h-screen bg-gray-50">
        <Text className="block text-sm text-gray-500">加载中...</Text>
      </View>
    )
  }

  return (
    <View className="min-h-screen bg-gray-50 pb-4">
      {/* 返回按钮和标题 */}
      <View className="bg-white px-4 py-4 border-b border-gray-100 flex items-center">
        <View className="w-8 h-8 flex items-center justify-center" onClick={handleGoBack}>
          <Text className="block text-xl text-gray-700">←</Text>
        </View>
        <Text className="block text-base font-semibold ml-2">内容详情</Text>
      </View>

      <View className="bg-white rounded-xl m-4 p-4 shadow-sm border border-gray-100">
        <View className="mb-3">
          <View className="bg-blue-50 px-3 py-1 rounded-full inline-block">
            <Text className="block text-xs text-blue-600">{content.category}</Text>
          </View>
          {content.is_free && (
            <View className="bg-green-50 px-3 py-1 rounded-full inline-block ml-2">
              <Text className="block text-xs text-green-600">免费</Text>
            </View>
          )}
        </View>

        <Text className="block text-lg font-semibold mb-4">{content.title}</Text>

        {(!content.is_free && !content.unlocked) ? (
          <>
            <View className="mb-4">
              <Text className="block text-sm font-medium text-gray-700 mb-2">⚠️ 内容预览</Text>
              <View className="bg-gray-50 rounded-lg p-3">
                <Text className="block text-sm text-gray-600 leading-relaxed">
                  {content.preview}...
                </Text>
              </View>
            </View>

            <View className="flex flex-col items-center justify-center bg-orange-50 rounded-lg py-6 mb-4">
              <Text className="block text-3xl mb-2">🔒</Text>
              <Text className="block text-sm text-orange-600 font-medium mb-1">此内容需解锁</Text>
            </View>

            <View className="w-full">
              <Button
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg py-3 font-medium"
                onClick={handleShowAd}
                disabled={isPlayingAd}
              >
                {isPlayingAd ? '广告播放中...' : '📺 观看广告解锁'}
              </Button>
            </View>
          </>
        ) : (
          <>
            <View className="mb-4">
              <Text className="block text-sm font-medium text-gray-700 mb-2">✓ 完整内容</Text>
              <View className="bg-gray-50 rounded-lg p-4">
                <Text className="block text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {content.content}
                </Text>
              </View>
            </View>
          </>
        )}
      </View>

      {showAdModal && (
        <View className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <View className="flex justify-center mb-4">
              <Text className="block text-4xl">📺</Text>
            </View>
            <Text className="block text-lg font-semibold text-center mb-2">
              观看广告解锁完整内容
            </Text>
            <Text className="block text-sm text-gray-500 text-center mb-4">
              需要完整观看 15 秒广告才能解锁内容，中间不能退出
            </Text>
            <View className="flex flex-col gap-3">
              <Button
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg py-3 font-medium"
                onClick={handleShowAd}
              >
                开始观看广告
              </Button>
              <Button
                className="w-full bg-gray-100 text-gray-600 rounded-lg py-3"
                onClick={handleCloseModal}
                disabled={isPlayingAd}
              >
                取消
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default DetailPage
