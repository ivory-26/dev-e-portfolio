interface VercelRequest {
  method?: string;
  query?: { [key: string]: string | string[] };
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
  setHeader: (name: string, value: string) => void;
  end: () => void;
}

const GITHUB_USERNAME = 'ivory-26';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // This stays on the server!

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

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'Portfolio-Widget'
    };

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    // Fetch events
    const eventsResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public`,
      { headers }
    );

    if (!eventsResponse.ok) {
      throw new Error(`GitHub API failed: ${eventsResponse.status}`);
    }

    const events = (await eventsResponse.json()) as GithubEvent[];
    const latestPushEvent = events.find((event) => event.type === 'PushEvent');

    if (!latestPushEvent?.repo?.name || !latestPushEvent.payload?.head) {
      return res.status(200).json({ commit: null });
    }

    const repoFullName = latestPushEvent.repo.name;
    const headSha = latestPushEvent.payload.head;

    // Fetch commit details
    const commitResponse = await fetch(
      `https://api.github.com/repos/${repoFullName}/commits/${headSha}`,
      { headers }
    );

    if (!commitResponse.ok) {
      throw new Error(`GitHub commit API failed: ${commitResponse.status}`);
    }

    const commitJson = await commitResponse.json();
    const commitDate = commitJson.commit?.committer?.date || latestPushEvent.created_at || new Date().toISOString();
    const branchName = latestPushEvent.payload.ref?.replace('refs/heads/', '') || 'main';
    const repoName = repoFullName.split('/')[1] || repoFullName;

    const commitData = {
      sha: headSha.substring(0, 7),
      message: commitJson.commit?.message || 'Updated files',
      repo: repoName,
      branch: branchName,
      date: commitDate,
      url: commitJson.html_url || `https://github.com/${repoFullName}/commit/${headSha}`
    };

    return res.status(200).json({ commit: commitData });
  } catch (error) {
    console.error('GitHub API error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch GitHub data',
      commit: null 
    });
  }
}
