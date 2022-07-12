import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

export const theme = extendTheme({
  config,
  colors: {
    spotify: {
      '50': '#e6f7ea',
      '100': '#c3eacb',
      '200': '#9cdcaa',
      '300': '#71cf88',
      '400': '#4cc46e',
      '500': '#1DB954',
      '600': '#10aa4a',
      '700': '#00973e',
      '800': '#008633',
      '900': '#00671e'
    }
  },
  components: {}
});
