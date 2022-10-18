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
      bg: 'bg.base',
      overflow: 'hidden'
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
    muted: '#6a6a6a',
    base: '#b3b3b3',
    body: 'var(--chakra-colors-chakra-body-text)'
  },

  spotify: {
    '50': '#e6f7ea',
    '100': '#c3eacb',
    '200': '#9cdcaa',
    '300': '#71cf88',
    '400': '#4cc46e',
    '500': '#1db954',
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
      padding: 0,

      _hover: {
        opacity: 1
      },

      _active: {}
    }),

    solid: (props: StyleFunctionProps) => ({
      ...defaultTheme.components.Button.variants.solid(props),

      backgroundColor:
        props.colorMode === 'dark' &&
        props.colorScheme === 'spotify' &&
        `var(--chakra-colors-${props.colorScheme}-500)`
    })
  }
};

const Card: ComponentStyleConfig = {
  baseStyle: (props: StyleFunctionProps) => ({
    background:
      props.colorMode === 'dark' && `var(--chakra-colors-bg-900)`,
    borderRadius: 'lg',
    padding: 4,
    overflow: 'hidden',
    position: 'relative'
  })
};

const Menu: ComponentStyleConfig = {
  baseStyle: (props: StyleFunctionProps) => ({
    list: {
      background:
        props.colorMode === 'dark' && `var(--chakra-colors-bg-900)`,
      border: '0'
    }
  })
};

const Input: ComponentStyleConfig = {
  variants: {
    filled: (props: StyleFunctionProps) => ({
      field: {
        background:
          props.colorMode === 'dark' && `var(--chakra-colors-bg-900)`,

        border: '0',

        _hover: {
          background:
            props.colorMode === 'dark' && `var(--chakra-colors-bg-800)`
        },

        _focus: {
          background:
            props.colorMode === 'dark' && `var(--chakra-colors-bg-800)`
        },

        _placeholder: {
          color:
            props.colorMode === 'dark' &&
            `var(--chakra-colors-text-base)`
        }
      }
    })
  }
};

const Select: ComponentStyleConfig = {
  variants: {
    filled: (props: StyleFunctionProps) => ({
      field: {
        background:
          props.colorMode === 'dark' && `var(--chakra-colors-bg-900)`,

        _hover: {
          background:
            props.colorMode === 'dark' && `var(--chakra-colors-bg-800)`
        },

        option: {
          background:
            props.colorMode === 'dark' && `var(--chakra-colors-bg-900)`
        }
      }
    })
  }
};

const Skeleton: ComponentStyleConfig = {
  defaultProps: {
    colorScheme: 'bg'
  }
};

const Table: ComponentStyleConfig = {
  variants: {
    'simple-with-hover': (props: StyleFunctionProps) => ({
      ...defaultTheme.components.Table.variants.simple(props),

      tr: {
        _hover: {
          background:
            props.colorMode === 'dark' &&
            `var(--chakra-colors-${props.colorScheme}-900)`
        }
      }
    })
  },
  defaultProps: {
    colorScheme: 'bg'
  }
};

const Tabs: ComponentStyleConfig = {
  variants: {
    line: {
      tab: {
        _focus: {
          background: 'none'
        }
      }
    },
    'solid-rounded': (props: StyleFunctionProps) => ({
      tab: {
        background:
          props.colorMode === 'dark' &&
          `var(--chakra-colors-${props.colorScheme}-900)`,

        borderRadius: 'sm',

        ':hover:not([aria-selected="true"])': {
          background:
            props.colorMode === 'dark' && `var(--chakra-colors-bg-800)`
        },

        _selected: {
          background:
            props.colorMode === 'dark' &&
            `var(--chakra-colors-${props.colorScheme}-100)`
        }
      },
      tablist: {
        gap: 2
      }
    })
  },

  defaultProps: {
    colorScheme: 'bg'
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
      Input,
      Menu,
      Select,
      Skeleton,
      Table,
      Tabs,

      // Custom

      Card
    }
  },

  withDefaultProps({
    defaultProps: {},
    components: []
  })
);
