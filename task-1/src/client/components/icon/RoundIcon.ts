import { Component } from "../../../pseudo-react/Component";
import { createElement } from "../../../pseudo-react/createElement";
import { Icons } from "../../../shared/types";
import { Icon } from "./Icon";

export const RoundIcon: Component<{
  background: string,
  color: string,
  icon: Icons,
  size: string
}> = ({ props: { background, color, icon, size } }) => {
  return createElement({
    type: 'div',
    attributes: {
      style: `
        background-color: ${background};
        width: ${size};
        height: ${size};
      `,
      class: 'inline-flex justify-center items-center rounded-full'
    },
    children: [
      createElement({
        type: Icon,
        attributes: {
          color,
          icon,
          size: `${parseFloat(size) / 2}${(size.match(/[a-z]+$/) ?? [])[0] ?? ''}`
        }
      })
    ]
  })
}
