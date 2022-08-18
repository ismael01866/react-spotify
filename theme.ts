import defaultTheme from '@chakra-ui/theme';
import { StyleFunctionProps } from '@chakra-ui/theme-tools';

import {
  ComponentStyleConfig,
  extendTheme,
  ThemeConfig,
  withDefaultProps
} from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

const styles = {
  global: {
    body: {
      bg: 'bg.base'
    }
  }
};

const colors = {
  bg: {
    '50': '#f5f5f5',
    '100': '#e9e9e9',
    '200': '#d9d9d9',
    '300': '#c4c4c4',
    '400': '#9d9d9d',
    '500': '#7b7b7b',
    '600': '#555555',
    '700': '#434343',
    '800': '#262626',
    '900': '#181818',
    base: '#000000'
  },

  text: {
    muted: '#6A6A6A',
    base: '#B3B3B3'
  },

  spotify: {
    '50': '#e6f7ea',
    '100': '#c3eacb',
    '200': '#1DB954',
    '300': '#71cf88',
    '400': '#4cc46e',
    '500': '#1DB954',
    '600': '#10aa4a',
    '700': '#00973e',
    '800': '#008633',
    '900': '#00671e'
  }
};

const sizes = {
  '8xs': '4rem',
  '7xs': '5rem',
  '6xs': '6rem',
  '5xs': '8rem',
  '4xs': '12rem'
};

const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 'base'
  },

  variants: {
    fade: (props: StyleFunctionProps) => ({
      ...defaultTheme.components.Button.variants.ghost(props),
      opacity: 0.6,

      _hover: {
        opacity: 1
      },

      _active: {}
    })
  }
};

const Card: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 'base',
    position: 'relative'
  }
};

const Menu: ComponentStyleConfig = {
  baseStyle: {
    list: {
      bg: 'bg.900',
      border: '0'
    }
  }
};

const Table: ComponentStyleConfig = {
  variants: {
    'simple-with-hover': (props: StyleFunctionProps) => ({
      ...defaultTheme.components.Table.variants.simple(props),

      tr: {
        _hover: {
          bg: 'whiteAlpha.200'
        }
      }
    })
  }
};

export const theme = extendTheme(
  {
    config,

    styles,
    colors,
    sizes,

    components: {
      Button,
      Menu,
      Table,

      // Custom

      Card
    }
  },

  withDefaultProps({
    defaultProps: {},
    components: []
  })
);
