export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '问答结果'
    })
  : { navigationBarTitleText: '问答结果' }
