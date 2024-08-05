export type IlogType = 'open' | 'close'


export interface IquickNav {
  title: string,
  content: {
    title: string,
    url: string
  }[]
}