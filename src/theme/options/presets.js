// @mui
import { alpha } from '@mui/material/styles';
// theme
import { palette as themePalette } from 'src/theme/palette';

// ----------------------------------------------------------------------

export function presets(presetsColor) {
  const primary = primaryPresets.find((i) => i.name === presetsColor);

  const theme = {
    palette: {
      primary,
    },
    customShadows: {
      primary: `0 8px 16px 0 ${alpha(`${primary?.main}`, 0.24)}`,
    },
  };

  return theme;
}

// ----------------------------------------------------------------------

const palette = themePalette('light');

export const primaryPresets = [
  // DEFAULT
  {
    name: 'default',
    ...palette.primary,
  },
  // GREEN
  {
    name: 'green',
    lighter: '#daefee',
    light: '#9ed5d3',
    main: '#41AEA9',
    dark: '#338985',
    darker: '#1c4a48',
    contrastText: '#FFFFFF',
  },
  // CYAN
  {
    name: 'cyan',
    lighter: '#CCF4FE',
    light: '#68CDF9',
    main: '#078DEE',
    dark: '#0351AB',
    darker: '#012972',
    contrastText: '#FFFFFF',
  },
  // PURPLE
  {
    name: 'purple',
    lighter: '#EBD6FD',
    light: '#B985F4',
    main: '#7635dc',
    dark: '#431A9E',
    darker: '#200A69',
    contrastText: '#FFFFFF',
  },
  {
    name: 'light-purple',
    lighter: '#ece6f4',
    light: '#bda9da',
    main: '#A084CA',
    dark: '#645CAA',
    darker: '#4c4686',
    contrastText: palette.grey[800],
  },
  // BLUE
  {
    name: 'blue',
    lighter: '#D1E9FC',
    light: '#76B0F1',
    main: '#2065D1',
    dark: '#103996',
    darker: '#061B64',
    contrastText: '#FFFFFF',
  },
  // ORANGE
  {
    name: 'orange',
    lighter: '#FEF4D4',
    light: '#FED680',
    main: '#fda92d',
    dark: '#B66816',
    darker: '#793908',
    contrastText: palette.grey[800],
  },
  // RED
  {
    name: 'red',
    lighter: '#FFE3D5',
    light: '#FFC1AC',
    main: '#FF3030',
    dark: '#B71833',
    darker: '#7A0930',
    contrastText: '#FFFFFF',
  },
  // PINK
  {
    name: 'pink',
    lighter: '#fedae9',
    light: '#fb91be',
    main: '#F94892',
    dark: '#d8075e',
    darker: '#8c053d',
    contrastText: '#FFFFFF',
  },
  {
    name: 'rouge-pink',
    lighter: '#fde0e9',
    light: '#fbc2d4',
    main: '#F999B7',
    dark: '#f55184',
    darker: '#8b0831',
    contrastText: palette.grey[800],
  },
  // PEACH
  {
    name: 'peach',
    lighter: '#ffcbcb',
    light: '#ffcbcb',
    main: '#FFB4B4',
    dark: '#FF9292',
    darker: '#e67e7e',
    contrastText: palette.grey[800],
  },
  {
    name: 'peach2',
    lighter: '#FBFFB1',
    light: '#FFEBB4',
    main: '#FFBFA9',
    dark: '#FFACAC',
    darker: '#ff5568',
    contrastText: palette.grey[800],
  },
  // TEST
  {
    name: 'test',
    lighter: '#FF5200',
    light: '#FA9905',
    main: '#F21170',
    dark: '#72147E',
    darker: '#4c4686',
    contrastText: palette.grey[800],
  },
  {
    name: 'pastel',
    lighter: '#EDFFA9',
    light: '#B0EFEB',
    main: '#FDBAF8',
    dark: '#ECA3F5',
    darker: '#c8b0fb',
    contrastText: palette.grey[800],
  },
];
