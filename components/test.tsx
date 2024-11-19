import { listAgents } from '@/lib/retell';

export default async function Home() {
  const agents = await listAgents();

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Retell Agents</h1>
      {agents.length > 0 ? (
        agents.map(agent => (
          <div key={agent.agent_id} className="mb-4 p-4 border rounded">
            <h2 className="font-semibold">Agent: {agent.agent_name}</h2>
            <p>Agent ID: {agent.agent_id}</p>
            <p>Voice: {agent.voice_id}</p>
            <details>
              <summary>Full Configuration</summary>
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                {JSON.stringify(agent, null, 2)}
              </pre>
            </details>
          </div>
        ))
      ) : (
        <p>No agents found</p>
      )}
    </main>
  );
}