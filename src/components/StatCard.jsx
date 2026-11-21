import React from "react";

function StatCard(props) {
  const title = props.title;
  const value = props.value;
  const icon = props.icon;
  const variant = props.variant;

  return (
    <div className={"stat-card stat-card-" + variant}>
      <div className="stat-card-top">
        <span className="stat-card-title">{title}</span>
        <div className="stat-card-icon">{icon}</div>
      </div>
      <div className="stat-card-value">{value}</div>
    </div>
  );
}

export default StatCard;