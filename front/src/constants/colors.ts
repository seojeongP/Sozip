const common = {
    UNCHANGE_WHITE: '#fff',
    UNCHANGE_BLACK: '#000',

    BLUE_MAIN: '#2D6EFF',
    BLUE_700: '#1237A6',
    BLUE_500: '#4863B3',
    BLUE_400: '#B4E0FF',
    BLUE_200: '#ECF2FF',

    GRAY_400: '#b5b5b5',

    RED_300: '#FFB4B4',
    RED_500: '#FF5F5F',
    RED_700: '#DA1818',

    GREEN_400: '#CCE6BA',
    YELLOW_400: '#FFE594',
    PURPLE_400: '#C4C4E7',

    PINK_200: '#FAE2E9',
    PINK_400: '#EC87A5',
    PINK_500: '#BF5C79',
    PINK_700: '#C63B64',
};

const colors = {
  light: {
    WHITE: '#FFF',
    GRAY_100: '#F8F8F8',
    GRAY_200: '#E7E7E7',
    GRAY_300: '#D8D8D8',
    GRAY_500: '#8E8E8E',
    GRAY_700: '#575757',
    BLACK: '#161616',
    ...common,
  },
  dark: {
    WHITE: '#161616',
    GRAY_100: '#202124',
    GRAY_200: '#3C4043',
    GRAY_300: '#5e5e5e',
    GRAY_500: '#8E8E8E',
    GRAY_700: '#F8F8F8',
    BLACK: '#fff',
    ...common,
  },
} as const;

const colorHex = {
  RED: colors['light'].PINK_400,
  BLUE: colors['light'].BLUE_400,
  GREEN: colors['light'].GREEN_400,
  YELLOW: colors['light'].YELLOW_400,
  PURPLE: colors['light'].PURPLE_400,
} as const;


export {colors, colorHex}