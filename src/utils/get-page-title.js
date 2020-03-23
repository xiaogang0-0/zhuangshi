import defaultSettings from '@/settings'

const title = defaultSettings.title || '上海住宅装饰一网通'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
