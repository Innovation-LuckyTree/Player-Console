export enum GameTypesEnum{
  TWO_DIGIT = '2D',
  THREE_DIGIT = '3D',
  LAST2 = 'LAST2'
};

export interface GameType{
  value: GameTypesEnum,
  label: string,
  digits: number,
  isPlayable: boolean,
  description: string
}

export const GAME_TYPES = [
  {
    value: GameTypesEnum.TWO_DIGIT,
    label: '2D',
    digits: 2,
    isPlayable: true,
    description: "Play Now! 2D"
  },
  {
    value: GameTypesEnum.THREE_DIGIT,
    label: '3D',
    digits: 3,
    isPlayable: true,
    description: "Play Now! 3D"
  },
  {
    value: GameTypesEnum.LAST2,
    label: 'LAST2',
    digits: 2,
    isPlayable: false,
    description: "Play Now! LAST 2"
  },
]
