export const routerBase = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');

export function appPath(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${routerBase}${normalizedPath}`;
}

export function absoluteAppPath(path = '/') {
  if (typeof window === 'undefined') {
    return path;
  }

  return `${window.location.origin}${appPath(path)}`;
}

export function restoreGitHubPagesRedirect() {
  if (typeof window === 'undefined') {
    return;
  }

  const { hash, search } = window.location;

  if (!search.startsWith('?/')) {
    return;
  }

  const redirectParts = search
    .slice(1)
    .split('&')
    .map((part) => part.replace(/~and~/g, '&'));
  const routePath = redirectParts.shift() || '/';
  const queryString = redirectParts.join('&');
  const normalizedRoute = routePath.startsWith('/') ? routePath : `/${routePath}`;
  const cleanUrl = `${routerBase}${normalizedRoute}${queryString ? `?${queryString}` : ''}${hash}`;

  window.history.replaceState(null, '', cleanUrl);
}
