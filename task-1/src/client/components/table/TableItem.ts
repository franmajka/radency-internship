import { Component } from "../../../pseudo-react/Component";
import { createElement } from "../../../pseudo-react/createElement";
import { Link } from "../../../pseudo-react/router/Link";
import { Icon } from "../icon/Icon";
import { RoundIcon } from "../icon/RoundIcon";
import { TableConf, TableTheme } from "./Table";

const centerClasses = `
  flex
  justify-center
  items-center
`;

const tableTextClasses = `
  overflow-hidden
  text-ellipsis
  whitespace-nowrap
`;

export const TableItem: Component<{
  theme: TableTheme[keyof TableTheme],
  cols: TableConf['cols'],
  item: TableConf['items'][number],
  gridCols: string
}> = ({ props: { theme, cols, item, gridCols }}) => {
  return createElement({
    type: "div",
    attributes: {
      class: `
        grid
        rounded-lg
        gap-2
        mt-2
        px-4 py-2
      `,
      style: `
        background-color: ${theme["background-color"]};
        grid-template-columns: ${gridCols};
      `
    },
    children: item.map((cell, idx) => {
      if (typeof cell === 'object') {
        const iconElement = cell.rounded ? (
          createElement({
            type: RoundIcon,
            attributes: {
              icon: cell.icon,
              background: theme["text-color-highlight"],
              color: theme["background-color"],
              size: cols[idx].width ?? '1rem'
            }
          })
        ) : (
          createElement({
            type: Icon,
            attributes: {
              icon: cell.icon,
              color: theme["text-color-highlight"],
              size: cols[idx].width ?? '1rem'
            }
          })
        );

        return createElement({
          type: 'div',
          attributes: {
            class: `${centerClasses}${cell.callback ? ' cursor-pointer' : ''} leading-none`
          },
          events: cell.callback ? {
            click: cell.callback
          } : {},
          children: [
            cell.link ? createElement({
              type: Link,
              attributes: {
                to: cell.link,
                content: iconElement
              }
            }) : iconElement
          ]
        });
      }

      return createElement({
        type: 'div',
        attributes: {
          class: `
            ${centerClasses}
            min-w-0
          `,
          style: `
            color: ${theme[
              cols[idx].highlight ?
                'text-color-highlight' :
                'text-color'
            ]};
          `
        },
        children: cell ? [
          createElement({
            type: 'span',
            attributes: {
              'class': tableTextClasses
            },
            children: [cell]
          })
        ] : []
      })
    })
  })
}
