import { Link } from "react-router-dom";
import { Theme } from "../../app/themes";
import { Icon } from "../icon/Icon";
import { RoundIcon } from "../icon/RoundIcon";
import { isIconObject, TableProps } from "./Table";

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

export const TableItem = ({ theme, cols, item, gridCols } : {
  theme: Theme,
  cols: TableProps['cols'],
  item: TableProps['items'][number],
  gridCols: string,
}) => (
  <div
    className={`
      grid
      rounded-lg
      gap-2
      mt-2
      px-4 py-2
    `}
    style={{
      backgroundColor: theme['background-color'],
      gridTemplateColumns: gridCols
    }}
  >
    { item.row.map((cell, idx) => {
      if (isIconObject(cell)) {
        const iconElement = cell.rounded ? (
          <RoundIcon
            icon={cell.icon}
            size={cols[idx].width ?? '1rem'}
            background={theme['text-color-highlight']}
            color={theme['background-color']}
          />
        ) : (
          <Icon
            icon={cell.icon}
            size={cols[idx].width ?? '1rem'}
            color={theme[
              cols[idx].highlight ? 'text-color-highlight' : 'text-color'
            ]}
          />
        )

        return (
          <div
            key={`${cols[idx].key}-${item.key}`}
            className={`
              ${centerClasses}
              ${cell.callback ? ' cursor-pointer' : ''}
              leading-none
            `}
            onClick={cell.callback}
          >
            { cell.link ? (
              <Link to={cell.link}>
                {iconElement}
              </Link>
            ) : iconElement }
          </div>
        )
      }

      return (
        <div
          key={`${cols[idx].key}-${item.key}`}
          className={`
            ${centerClasses}
            min-w-0
          `}
          style={{
            color: theme[
              cols[idx].highlight ?
                'text-color-highlight' :
                'text-color'
            ]
          }}
        >
          <span className={tableTextClasses}>
            {cell}
          </span>
        </div>
      )
    }) }
  </div>
)
