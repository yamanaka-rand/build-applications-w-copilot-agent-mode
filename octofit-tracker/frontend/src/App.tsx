import { useEffect, useState } from 'react';
import './App.css';

declare const __APP_CODESPACE_NAME__: string;

type RecordItem = {
  _id?: string;
  name?: string;
  title?: string;
  type?: string;
};

function getApiBaseUrl() {
  const env = import.meta as ImportMeta & { env?: Record<string, string | undefined> };
  const configuredBaseUrl = (env.env?.VITE_API_BASE_URL || '').trim();
  if (configuredBaseUrl) {
    return configuredBaseUrl;
  }

  const codespaceName = (__APP_CODESPACE_NAME__ || '').trim();
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

function App() {
  const [users, setUsers] = useState<RecordItem[]>([]);
  const [activities, setActivities] = useState<RecordItem[]>([]);
  const [status, setStatus] = useState('Loading API data...');
  const [apiBaseUrl, setApiBaseUrl] = useState('');

  useEffect(() => {
    const baseUrl = getApiBaseUrl();
    setApiBaseUrl(baseUrl);

    async function loadData() {
      try {
        const [usersResponse, activitiesResponse] = await Promise.all([
          fetch(`${baseUrl}/api/users`),
          fetch(`${baseUrl}/api/activities`),
        ]);

        if (!usersResponse.ok || !activitiesResponse.ok) {
          throw new Error('Unable to load API data');
        }

        const [usersData, activitiesData] = await Promise.all([
          usersResponse.json(),
          activitiesResponse.json(),
        ]);

        setUsers(usersData as RecordItem[]);
        setActivities(activitiesData as RecordItem[]);
        setStatus('API connected successfully');
      } catch (error) {
        setStatus(error instanceof Error ? error.message : 'Unknown API error');
      }
    }

    loadData();
  }, []);

  return (
    <div className="app-container container py-4">
      <h1 className="display-5 mb-3">OctoFit Tracker</h1>
      <p className="text-muted">React 19 + Vite で構築されたフロントエンド</p>
      <div className="alert alert-info">API base URL: {apiBaseUrl || 'detecting...'}</div>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="h5">Users</h2>
              <p className="text-muted">{status}</p>
              <ul className="mb-0">
                {users.slice(0, 5).map((user, index) => (
                  <li key={user._id || index}>{user.name || 'Unnamed user'}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="h5">Activities</h2>
              <ul className="mb-0">
                {activities.slice(0, 5).map((activity, index) => (
                  <li key={activity._id || index}>{activity.type || 'Activity'} </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
