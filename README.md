# Issue Overview

## 1. List Agents API

- **Endpoint**: `GET /list-agents`

### Observation:
The API returned an empty array (`[]`) when attempting to fetch the list of agents.

### Screenshot of the Response:
![List Agents Response](./public/listagent.png)

### Workaround:
To proceed, I used dummy data for agents during testing and development.

---

## 2. Create Agent API

- **Endpoint**: `POST /create-agent`

### Observation:
The API returned a `400 Bad Request` with the error message:

### Screenshot of the Response:
![List Agents Response](./public/createagent.png)

```json
{
  "status": "error",
  "message": "Invalid retell llm id."
}

