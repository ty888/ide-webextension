export type IlogType = 'open' | 'close'


export interface IquickNav {
  title: string,
  content: {
    title: string,
    url: string
  }[]
}

export interface IpluginList {
  link: string,
  title: string
  id: number,
  created_at: string
}