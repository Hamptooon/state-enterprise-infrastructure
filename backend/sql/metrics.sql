SELECT 
  metrics.id as id,
  metrics.datetime,
  metrics.cpu_utilization AS cpuUtilization,
  metrics.memory_utilization AS memoryUtilization,
  metrics.disk_utilization AS diskUtilization,
  metrics.node_id as nodeId
FROM metrics
LEFT JOIN nodes ON metrics.node_id = nodes.id
ORDER BY metrics.datetime DESC;