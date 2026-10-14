# Connected CRM

A small-business CRM with a customer forum, surveys and role-based workflows.
Chen Jiang served as Product Owner and contributed UI/UX design and code for
Team CONNECTED’s University of Melbourne COMP30022 IT Project in Semester 2, 2021.

## Team

| Contributor | Role |
| --- | --- |
| Chen Jiang | Product Owner; UI/UX design and coding |
| Xinyue Zhang | Scrum Master |
| Zhihui Chen | Testing and QA Lead |
| Jun Cheng Woo | Front-end Lead |
| Linyan Zhu | Back-end Lead |

## Implementation

React screens support customer forum posts, comments and survey interactions.
The Node/Express API uses MongoDB/Mongoose for application records and Auth0
for authentication. The original client/server split and team contribution
history are retained.

The maintained Auth0 management boundary checks validated identity, ownership
and administrator permission. It validates inputs, bounds provider requests and
keeps user-facing errors separate from provider response details. Management
integration is enabled through explicit configuration.

## Local development

Use the original Yarn workspace scripts:

```sh
yarn
yarn client
yarn server
```

The client runs on port 5000 and API on port 3000. Set MongoDB and Auth0 variables
using [server/.env.example](server/.env.example). The client needs
`REACT_APP_AUTH0_DOMAIN`, `REACT_APP_AUTH0_CLIENT_ID` and
`REACT_APP_AUTH0_AUDIENCE`. Supply your own local configuration.

Auth0 management calls default to disabled; enable them with
`ENABLE_AUTH0_MANAGEMENT=true` and the documented management variables.
The original full-stack setup uses older dependencies and requires a configured
database and authentication tenant.

## Checks and 2026 maintenance

```sh
node server/test/security/auth0.cjs
```

This offline regression checks disabled-management behavior, import-time side
effects, malformed input, cross-user access and administrator permissions using
fake provider responses. It passes without contacting Auth0.

2026 AI-assisted maintenance strengthened configuration and permission checks,
added bounded provider handling and made external-provider tests explicitly
opt-in. The React interface, forum/survey features and original team history
remain the project’s core.
