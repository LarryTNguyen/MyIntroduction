import { useCallback, useEffect, useMemo, useState } from 'react';
import { projects as staticProjects } from '../data/projects.js';
import {
  deleteProjectFromSupabase,
  fetchProjectsFromSupabase,
  upsertProjectToSupabase,
} from '../lib/contentApi.js';
import { isSupabaseConfigured } from '../lib/supabaseClient.js';

export function useProjects() {
  const [projects, setProjects] = useState(staticProjects);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState('');
  const [source, setSource] = useState(isSupabaseConfigured ? 'loading' : 'static');

  const loadProjects = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setProjects(staticProjects);
      setSource('static');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const remoteProjects = await fetchProjectsFromSupabase();
      if (remoteProjects.length > 0) {
        setProjects(remoteProjects);
        setSource('supabase');
      } else {
        setProjects(staticProjects);
        setSource('static-empty');
      }
    } catch (nextError) {
      setProjects(staticProjects);
      setSource('static-error');
      setError(nextError.message || 'Unable to load projects from Supabase.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const featuredProjects = useMemo(() => projects.filter((project) => project.featured).slice(0, 4), [projects]);

  async function saveProject(project) {
    const saved = await upsertProjectToSupabase(project);
    await loadProjects();
    return saved;
  }

  async function removeProject(projectId) {
    await deleteProjectFromSupabase(projectId);
    await loadProjects();
  }

  return {
    projects,
    featuredProjects,
    loading,
    error,
    source,
    isUsingFallback: source !== 'supabase',
    reloadProjects: loadProjects,
    saveProject,
    removeProject,
  };
}
