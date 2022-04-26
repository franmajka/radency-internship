export const moveLocation = (to: string) => {
  window.history.pushState(null, '', to);

  window.dispatchEvent(new Event('popstate'));
}
