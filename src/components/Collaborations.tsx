"use client";

import React, { useState } from 'react';
import VariationSlack from './variation-slack';
import VariationTeams from './VariationTeams';

const Collaborations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'slack' | 'teams'>('slack');

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 0' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '800px', padding: '0 20px' }}>
        <div style={{
          fontSize: '12px',
          fontWeight: 600,
          color: '#0D41E1',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '12px',
          fontFamily: 'var(--font-secondary)'
        }}>
          HOW TRENCH WORKS INSIDE COLLABORATION
        </div>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 700,
          color: '#111827',
          marginBottom: '16px',
          lineHeight: 1.2,
          fontFamily: 'var(--font-primary)'
        }}>
          A full investigation, inside the thread.
        </h2>
        <p style={{
          fontSize: 'clamp(14px, 2vw, 18px)',
          color: '#4B5563',
          lineHeight: 1.6,
          fontFamily: 'var(--font-secondary)'
        }}>
          From detection to remediation, inside one Slack or Teams thread.
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
            background: activeTab === 'slack' ? '#0D41E1' : 'transparent',
            color: activeTab === 'slack' ? '#fff' : '#4B5563',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: activeTab === 'slack' ? '0 2px 4px rgba(13, 65, 225, 0.2)' : 'none'
          }}
        >
          Slack View
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
          Teams View
        </button>
      </div>

      {/* Content */}
      <div style={{ width: '100%' }}>
        {activeTab === 'slack' ? (
          <VariationSlack />
        ) : (
          <VariationTeams />
        )}
      </div>
    </div>
  );
};

export default Collaborations;
