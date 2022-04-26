import { Component } from "../../../pseudo-react/Component";
import { createElement } from "../../../pseudo-react/createElement";
import { MemoizedCallback } from "../../../pseudo-react/hooks/types";
import { Icons } from "../../../shared/types";
import { appTheme } from "../../appTheme";
import { Hooks } from "../../hooks";
import { Icon } from "../icon/Icon";
import { RoundIcon } from "../icon/RoundIcon";
import { TableItem } from "./TableItem";

export type IconObj = {
  icon: Icons,
  rounded?: boolean,
  callback?: (e: Event) => void
  link?: string
};

export type TableTheme = Record<'dark' | 'light', {
  'text-color': string,
  'background-color': string
  'text-color-highlight': string,
}>;

export type TableConf = {
  mainTheme?: keyof TableTheme,
  theme?: TableTheme,
  cols: {
    title?: string | IconObj | ReturnType<typeof createElement>,
    width?: string,
    highlight?: boolean
  }[],
  items: (string | IconObj | ReturnType<typeof createElement> | undefined)[][]
};

const defaultMainTheme = 'light';
const defaultTheme: TableTheme = appTheme;

export const Table: Component<TableConf> = ({
  props: { cols, items, mainTheme: _mainTheme, theme: _theme }
}) => {
  const mainTheme = _mainTheme ?? defaultMainTheme;
  const subTheme = mainTheme === 'light' ? 'dark' : 'light';
  const theme = _theme ?? defaultTheme;

  const gridCols = cols
    .map(col => col.width ?? '1fr')
    .join(' ');

  return createElement({
    type: 'div',
    children: [
      // Table Head
      createElement({
        type: TableItem,
        attributes: {
          gridCols,
          cols,
          theme: theme[subTheme],
          item: cols.map(col => col.title)
        }
      }),

      ...items.map(item => createElement({
        type: TableItem,
        attributes: {
          gridCols,
          cols,
          item,
          theme: theme[mainTheme]
        }
      }))
    ]
  })
}
