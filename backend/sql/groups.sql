SELECT 
  groups.id AS id,
  groups.caption AS groupName,
  nodes.id AS nodeId,
  nodes.caption AS nodeName,
  nodes.status AS nodeStatus,
  statuses.color AS nodeStatusColor,
  statuses.description AS nodeStatusDescription,
  interfaces.id AS interfaceId,
  interfaces.caption AS interfaceName,
  interfaces.status AS interfaceStatus,
  statuses.color AS interfaceStatusColor,
  statuses.description AS interfaceStatusDescription,
  applications.id AS applicationId, 
  applications.caption AS applicationName,
  users.firstname || ' ' || users.lastname AS adminName,
  users.email AS adminEmail,
  users.id AS adminId
FROM groups
LEFT JOIN groups_nodes ON groups.id = groups_nodes.group_id
LEFT JOIN nodes ON groups_nodes.node_id = nodes.id
LEFT JOIN statuses ON nodes.status = statuses.id
LEFT JOIN interfaces ON nodes.interface = interfaces.id
LEFT JOIN nodes_applications ON nodes.id = nodes_applications.node_id
LEFT JOIN applications ON nodes_applications.application_id = applications.id
LEFT JOIN users ON nodes.admin = users.id
ORDER BY groups.id, nodes.id;