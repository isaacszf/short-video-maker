export enum Level {
  Green = "FÁCIL",
  Yellow = "MÉDIO",
  Red = "DIFÍCIL"
}

export type VideoProps = {
  title: string,
  level: Level,
  data: string[][],
  seconds: number,
  gifUrl: string,
}