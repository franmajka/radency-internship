import { Component } from "../../pseudo-react/Component";
import { createElement } from "../../pseudo-react/createElement";

// For tailwind content
const ratioToClass = {
  '3/4': 'w-3/4',
  '1/3': 'w-1/3'
}

export const Layout: Component<{
  ratio?: keyof typeof ratioToClass
  content: ReturnType<typeof createElement>
}> = ({ props: { ratio, content } }) => {
  return createElement({
    type: 'div',
    attributes: {
      class: `
        mx-auto my-0
        ${ratio ? ratioToClass[ratio] : 'w-3/4'}
      `
    },
    children: [
      content
    ]
  })
}
