import { Component } from "../Component";
import { createElement } from "../createElement";
import { DefaultHooks } from "../hooks/types";
import { moveLocation } from "./moveLocation";

export const Link: Component<{
  to: string,
  content: string | ReturnType<typeof createElement>
}, {
  useCallback: DefaultHooks<{}>['useCallback']
}> = ({ props: { to, content }, hooks: {useCallback}}) => {
  return createElement({
    type: 'a',
    attributes: {
      href: to
    },
    events: {
      click: useCallback((e: Event) => {
        e.preventDefault();

        moveLocation(to)
      }, [moveLocation, to])
    },
    children: [content]
  })
}
