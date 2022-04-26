import { Component } from "../../../pseudo-react/Component";
import { createElement } from "../../../pseudo-react/createElement";
import { appTheme } from "../../appTheme";
import { Hooks } from "../../hooks";

export const Button: Component<{
  content: string | ReturnType<typeof createElement>,
  background?: string,
  color?: string
  callback?: (e: MouseEvent) => void
}, Hooks> = ({
  props: {
    content,
    background: _background,
    color: _color,
    callback
  },
  hooks: {useCallback}
}) => {
  const background = _background ?? appTheme.dark['background-color'];
  const color = _color ?? appTheme.dark['text-color-highlight'];

  return createElement({
    type: 'div',
    attributes: {
      tabindex: 0,
      class: `
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
      `,
      style: `
        background-color: ${background};
        color: ${color}
      `
    },
    events: callback ? {
      click: callback,
      keyup: useCallback(
        function(this: any, e: KeyboardEvent) {
          e.preventDefault();
          if (e.key === 'Enter') {
            this?.click();
          }
        }, []
      )
    } : {},
    children: [content]
  })
}
