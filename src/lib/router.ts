import { useEffect, useState, useCallback } from 'react';

/**
 * Minimal client-side router using the History API.
 * Supports pushState navigation and popstate (back/forward).
 */

function getCurrentPath(): string {
  return window.location.pathname || '/';
}

const listeners = new Set<(path: string) => void>();

export function useNavigate() {
  const navigate = useCallback((to: string) => {
    if (to === getCurrentPath()) return;
    window.history.pushState({}, '', to);
    listeners.forEach((l) => l(to));
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);
  return navigate;
}

export function useRouter() {
  const [path, setPath] = useState<string>(getCurrentPath());

  useEffect(() => {
    const onPopState = () => {
      const p = getCurrentPath();
      setPath(p);
      listeners.forEach((l) => l(p));
    };
    window.addEventListener('popstate', onPopState);
    listeners.add(setPath);
    return () => {
      window.removeEventListener('popstate', onPopState);
      listeners.delete(setPath);
    };
  }, []);

  const navigate = useNavigate();

  return { path, navigate };
}
