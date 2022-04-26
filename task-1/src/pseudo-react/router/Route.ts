import { Component } from "../Component";
import { createElement } from "../createElement";
import { VNodeMinimized } from "../VNode";

let params: Record<string, any> = {};

export const useParams = () => params

export const Route: Component<{
  path: string,
  content: ReturnType<Component<any, any>>
}> = ({ props: { path, content } }) => {
  const url = new URL(window.location as any);
  const urlParts = url.pathname.split('/')

  const newParams: typeof params = {};

  const pathParts = path.split('/');

  let isMatch = false;

  if (pathParts.length === urlParts.length) {
    isMatch = pathParts.reduce<boolean>((acc, pathPart, idx) => {
      if (!acc) return acc;

      if (pathPart.startsWith(':')) {
        newParams[pathPart.slice(1)] = urlParts[idx];
        return true;
      }

      return pathPart === urlParts[idx];
    }, true);
  }


  if (isMatch) {
    params = newParams;
    return content;
  }

  return createElement({ type: null, children: [] });
}
