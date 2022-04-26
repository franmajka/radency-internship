import { Component } from "../../../pseudo-react/Component";
import { createElement } from "../../../pseudo-react/createElement";
import { Icons } from "../../../shared/types";

export const Icon: Component<{
  color: string,
  size: string,
  icon: Icons
}> = ({ props: { color, size, icon }}) => {
  return createElement({
    type: 'span',
    attributes: {
      class: `icon-${icon}`,
      style: `
        color: ${color};
        font-size: ${size};
      `
    }
  })
}
