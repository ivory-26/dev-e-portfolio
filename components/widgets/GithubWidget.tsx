import React, { useEffect, useState } from 'react';
import { GitBranch, Clock, ExternalLink } from 'lucide-react';

interface CommitData {
  sha: string;
  message: string;
  repo: string;
  branch: string;
  date: string;
  url: string;
}

interface GithubEvent {
  type?: string;
  repo?: {
    name?: string;
  };
  payload?: {
    ref?: string;
    head?: string;
  };
  created_at?: string;
}

const GITHUB_USERNAME = 'ivory-26';

export const GithubWidget: React.FC = () => {
  const [commit, setCommit] = useState<CommitData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeAgo, setTimeAgo] = useState('');

  const getTimeAgo = (dateString: string) => {
    const now = new Date().getTime();
    const commitDate = new Date(dateString).getTime();
    const diffInSeconds = Math.floor((now - commitDate) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  useEffect(() => {
    const fetchLatestCommit = async () => {
      try {
        // Use our serverless API endpoint instead of calling GitHub directly
        const response = await fetch('/api/github');
        
        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.commit) {
          setCommit(data.commit);
          setTimeAgo(getTimeAgo(data.commit.date));
        } else {
          setCommit(null);
          setTimeAgo('');
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setCommit(null);
        setTimeAgo('');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestCommit();

    // Refresh every 15 minutes to avoid rate limits while keeping data reasonably fresh
    const refreshInterval = setInterval(fetchLatestCommit, 15 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    if (!commit) return;
    
    // Update time ago every minute
    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo(commit.date));
    }, 60000);

    return () => clearInterval(interval);
  }, [commit]);

  if (loading) {
    return (
      <div className="bg-surface border border-border p-6 rounded-lg flex items-center justify-center w-full h-full">
        <div className="text-sm text-secondary">Loading...</div>
      </div>
    );
  }

  if (!commit) {
    return (
      <div className="bg-surface border border-border p-6 rounded-lg flex items-center justify-center w-full h-full">
        <div className="text-sm text-secondary">No recent commits</div>
      </div>
    );
  }

  return (
    <a 
      href={commit.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-surface border border-border p-6 rounded-lg flex flex-col justify-between group hover:border-accent/50 transition-colors w-full h-full cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2 text-xs font-mono text-secondary">
            <GitBranch size={14} />
            <span>{commit.branch}</span>
        </div>
        <div className="px-2 py-1 bg-background/50 rounded text-[10px] font-mono text-secondary border border-border group-hover:border-accent group-hover:text-accent transition-colors">
            {commit.sha}
        </div>
      </div>

      <div>
        <div className="text-sm text-primary font-mono mb-1 truncate group-hover:text-accent transition-colors">
           {commit.message}
        </div>
        <div className="text-xs text-secondary">
            {commit.repo}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-secondary">
          <Clock size={12} />
          <span>{timeAgo}</span>
        </div>
        <ExternalLink size={12} className="text-secondary group-hover:text-accent transition-colors" />
      </div>
    </a>
  );
};