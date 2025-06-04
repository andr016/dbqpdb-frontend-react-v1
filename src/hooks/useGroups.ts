import { useState, useEffect } from 'react';
import axios from 'axios';

interface Group {
  group_id: string;
  group_name: string;
}

export const useGroups = (apiClient: any, config: any) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          new URL(config.apiPrefix + "group", apiClient.baseUrl).href
        );
        setGroups(response.data);
      } catch (err) {
        setError('Failed to load groups');
        console.error("Error fetching groups:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [apiClient.baseUrl, config.apiPrefix]);

  return {
    groups,
    loading,
    error,
    groupOptions: groups.map(g => ({ 
      value: g.group_id, 
      label: g.group_name 
    })),
  };
};