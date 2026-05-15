"use client";

import React, { useState } from 'react';
import VariationSlack from './variation-slack';
import VariationTeams from './VariationTeams';
import VariationClaude from './VariationClaude';

const Collaborations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'slack' | 'teams' | 'claude'>('slack');

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 0' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '800px', padding: '0 20px' }}>
        <div className="eyebrow" style={{ justifyContent: 'center' }}>
          HOW TRENCH WORKS INSIDE COLLABORATION
        </div>
        <h2 className="title-lg" style={{ marginBottom: '16px' }}>
          We bring SecOps to where you work.
        </h2>
        <p className="body-lead" style={{ margin: '0 auto' }}>
          From detection to remediation, inside Slack, Teams or Claude.
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '32px',
        background: '#F3F4F6',
        padding: '6px',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
      }}>
        <button
          onClick={() => setActiveTab('slack')}
          style={{
            padding: '10px 24px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'slack' ? '#532455' : 'transparent',
            color: activeTab === 'slack' ? '#fff' : '#4B5563',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: activeTab === 'slack' ? '0 2px 4px rgba(83, 36, 85, 0.2)' : 'none'
          }}
        >
          Slack
        </button>
        <button
          onClick={() => setActiveTab('teams')}
          style={{
            padding: '10px 24px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'teams' ? '#4F46E5' : 'transparent', // Teams purple-ish blue
            color: activeTab === 'teams' ? '#fff' : '#4B5563',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: activeTab === 'teams' ? '0 2px 4px rgba(79, 70, 229, 0.2)' : 'none'
          }}
        >
          Teams
        </button>
        <button
          onClick={() => setActiveTab('claude')}
          style={{
            padding: '10px 24px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'claude' ? '#D96B43' : 'transparent',
            color: activeTab === 'claude' ? '#fff' : '#4B5563',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: activeTab === 'claude' ? '0 2px 4px rgba(217, 107, 67, 0.2)' : 'none'
          }}
        >
          Claude
        </button>
      </div>

      {/* Content */}
      <div style={{ width: '100%' }}>
        {activeTab === 'slack' && <VariationSlack />}
        {activeTab === 'teams' && <VariationTeams />}
        {activeTab === 'claude' && <VariationClaude />}
      </div>
    </div>
  );
};

export default Collaborations;
