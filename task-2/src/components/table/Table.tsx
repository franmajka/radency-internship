import { useContext } from "react";
import { Theme } from "../../app/themes";
import { Icons } from "../../app/types";
import { ThemesContext } from "../../contexts/ThemesContext";
import { TableItem } from "./TableItem";

export type IconObj = {
  icon: Icons,
  rounded?: boolean,
  callback?: (e: React.SyntheticEvent<Element, MouseEvent>) => void
  link?: string
};

export const isIconObject = (obj: any): obj is IconObj => typeof obj === 'object' && obj.icon

export interface TableProps {
  cols: {
    key: string
    title?: React.ReactNode | IconObj,
    width?: string,
    highlight?: boolean
  }[],
  items: {
    key: string,
    row: (React.ReactNode | IconObj)[]
  }[]
};

export const Table = ({ cols, items } : TableProps) => {
  const theme = useContext(ThemesContext);
  let mainTheme: Theme, subTheme: Theme;

  if (theme.main === 'dark') {
    mainTheme = theme.dark;
    subTheme = theme.light;
  } else {
    mainTheme = theme.light;
    subTheme = theme.dark;
  }

  const gridCols = cols
    .map(col => col.width ?? '1fr')
    .join(' ');

  return (
    <div>
      <TableItem
        theme={subTheme}
        gridCols={gridCols}
        cols={cols}
        item={{
          key: '__HEADER_ROW__',
          row: cols.map(col => col.title)
        }}
      />

      {items.map(item => (
        <TableItem
          key={item.key}
          theme={mainTheme}
          gridCols={gridCols}
          cols={cols}
          item={item}
        />
      ))}
    </div>
  );
}
