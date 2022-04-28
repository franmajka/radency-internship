import { useContext } from "react"
import { ThemesContext } from "../../contexts/ThemesContext"

export const Button = ({
  children, onClick
} : {
  onClick?: React.MouseEventHandler,
  children: string
}) => {
  const theme = useContext(ThemesContext);
  const {
    'background-color': backgroundColor,
    'text-color': color
  } = theme[theme.main === 'light' ? 'dark' : 'light']

  return (
    <button
      onClick={onClick}
      className={`
        w-full
        outline-none
        rounded-lg
        text-center
        px-4 py-2
        transition-all
        opacity-95
        hover:opacity-100
        focus:opacity-100
        cursor-pointer
        select-none
      `}
      style={{ backgroundColor, color }}
    >
      {children}
    </button>
  )
}
