// 性能监控工具
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private loadTimes: Map<string, number> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // 记录语言包加载时间
  startLoadingLocale(locale: string) {
    this.loadTimes.set(`locale-${locale}-start`, performance.now())
  }

  endLoadingLocale(locale: string) {
    const startTime = this.loadTimes.get(`locale-${locale}-start`)
    if (startTime) {
      const endTime = performance.now()
      const loadTime = endTime - startTime
      this.loadTimes.set(`locale-${locale}-duration`, loadTime)
      
      console.log(`🚀 语言包 ${locale} 加载耗时: ${loadTime.toFixed(2)}ms`)
      
      // 发送性能数据到监控系统（可选）
      this.reportPerformance('locale-load', {
        locale,
        duration: loadTime,
        timestamp: Date.now()
      })
    }
  }

  // 获取所有语言包加载时间
  getLocaleLoadTimes(): Record<string, number> {
    const times: Record<string, number> = {}
    
    for (const [key, value] of this.loadTimes.entries()) {
      if (key.includes('-duration')) {
        const locale = key.replace('-duration', '').replace('locale-', '')
        times[locale] = value
      }
    }
    
    return times
  }

  // 报告性能数据
  private reportPerformance(type: string, data: any) {
    // 这里可以集成真实的性能监控服务
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 性能数据 [${type}]:`, data)
    }
  }

  // 获取页面加载性能
  getPageLoadPerformance() {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    return {
      // DNS 查询时间
      dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
      // TCP 连接时间
      tcpConnect: navigation.connectEnd - navigation.connectStart,
      // 请求响应时间
      request: navigation.responseEnd - navigation.requestStart,
      // DOM 解析时间
      domParse: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      // 页面完全加载时间
      pageLoad: navigation.loadEventEnd - navigation.navigationStart
    }
  }
}

// 导出单例实例
export const performanceMonitor = PerformanceMonitor.getInstance()