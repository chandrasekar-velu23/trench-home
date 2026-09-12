import React from 'react';

export default function HeadlessSecOpsModes() {
  return (
    <div style={{
      padding: '24px',
      border: '1px dashed rgba(49, 82, 185, 0.3)',
      borderRadius: '12px',
      background: 'rgba(49, 82, 185, 0.03)',
      margin: '24px 0',
      textAlign: 'center'
    }}>
      <h4 style={{ margin: '0 0 8px', color: '#3152B9', fontWeight: 700 }}>Interactive Module: Headless SecOps Modes</h4>
      <p style={{ margin: 0, fontSize: '0.9rem', color: '#4A4A4A' }}>Switching between Autonomous Triage, Shadow Validation, and Collaborative Co-Pilot mode.</p>
    </div>
  );
}
