

export const appThemes = {
  main: 'light',
  dark: {
    'text-color': '#e5e7eb',
    'background-color': '#374151',
    'text-color-highlight': '#fff'
  },
  light: {
    'text-color': '#6b7280',
    'background-color': '#e5e7eb',
    'text-color-highlight': '#374151'
  }
};

export type Themes = typeof appThemes;
export type Theme = Themes['light']
