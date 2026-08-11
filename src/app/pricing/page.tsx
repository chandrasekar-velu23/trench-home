'use client';

import { useState } from 'react';
import styles from './pricing-calculator.module.css';

type ModuleKey = 'inv' | 'det' | 'resp' | 'exp';

type ModuleDefinition = {
  name: string;
  level: string;
  base: number;
  points: string[];
};

type Assumptions = {
  tiers: Array<{ label: string; price: number }>;
  multipliers: number[];
  sourceBuckets: Array<{ label: string; surcharge: boolean }>;
  highVolumeSurcharge: number;
  annualDiscount: number;
  storageSavingsLow: number;
  storageSavingsHigh: number;
  moduleSavings: number;
  implementation: {
    pct: number;
    points: string[];
  };
  modules: Record<ModuleKey, ModuleDefinition>;
  tierNames: Array<{ max: number; name: string; desc: string }>;
};

const initialAssumptions: Assumptions = {
  tiers: [
    { label: 'Bring your own SIEM/Data lake', price: 0 },
    { label: 'Under 50 GB/day', price: 2400 },
    { label: '50-100 GB/day', price: 3840 },
    { label: '100-300 GB/day', price: 7400 },
    { label: '300-500 GB/day', price: 10200 },
    { label: '500-750 GB/day', price: 13200 },
    { label: '750 GB/day - 1 TB/day', price: 15000 },
    { label: '1-1.5 TB/day', price: 18000 },
    { label: '1.5-2 TB/day', price: 22000 },
  ],
  multipliers: [1.0, 1.0, 1.25, 1.75, 2.1, 2.5, 3.0, 4.0, 5.5],
  sourceBuckets: [
    { label: 'Under 20 tools', surcharge: false },
    { label: '20-40 tools', surcharge: true },
    { label: '40+ tools', surcharge: true },
  ],
  highVolumeSurcharge: 0.1,
  annualDiscount: 0.15,
  storageSavingsLow: 0.25,
  storageSavingsHigh: 0.3,
  moduleSavings: 0.5,
  implementation: {
    pct: 0.1,
    points: [
      'Integration to Trench across log sources',
      'Migration from existing platform and workflows',
      'Migration of knowledgebase and context memory',
    ],
  },
  modules: {
    inv: {
      name: 'Investigation',
      level: 'L1',
      base: 2400,
      points: [
        'Always-on monitoring, 24x7',
        'Unlimited alerts (100 investigations/month)',
        'Every alert auto-triaged and closed',
        'Escalations under SLAs',
        'Enrichment and automated reporting',
        'Skills: dynamic context graphs, no playbooks',
      ],
    },
    det: {
      name: 'Detection & hunting',
      level: 'L2',
      base: 1800,
      points: [
        'Critical asset coverage, MITRE-aligned',
        'Correlation engine and kill chain discovery',
        'Intent-graph behavior analysis (UEBA 2.0)',
        'Proactive threat hunting, 24x7',
        'End-to-end agentic detection lifecycle',
        'Explicit layer for AI and agentic workflows',
      ],
    },
    resp: {
      name: 'Response',
      level: 'L2',
      base: 1500,
      points: [
        'Remediation actions at scale, with control',
        'End-to-end case closure workflows',
        'Cross-tool containment: EDR, identity, cloud',
      ],
    },
    exp: {
      name: 'AI security experts (MDR)',
      level: 'Expert',
      base: 2200,
      points: [
        'Expert engineers on call for escalations',
        'Context tuning and review over time',
        'Amplify outcomes with human judgment',
        'Custom use cases, posture assessments and executive reporting',
      ],
    },
  },
  tierNames: [
    { max: 5000, name: 'Vigilant', desc: 'Foundational watch: always-on coverage for lean teams starting out.' },
    { max: 12000, name: 'Resilient', desc: 'Layered defense: detection and response working in step.' },
    { max: 20000, name: 'Citadel', desc: 'Fortified operations: full-stack automation with expert oversight.' },
    { max: Infinity, name: 'Kingdom', desc: 'Total command: maximum scale, coverage, and white-glove support.' },
  ],
};

function fmt(n: number) {
  return `$${Math.round(n).toLocaleString('en-US')}`;
}

export default function PricingCalculatorPage() {
  const [state, setState] = useState({
    sourceBucket: 1,
    tierIdx: 1,
    billing: 'monthly' as 'monthly' | 'annual',
    modules: { inv: false, det: false, resp: false, exp: false } as Record<ModuleKey, boolean>,
    implementationOn: true,
  });
  const [assumptions, setAssumptions] = useState(initialAssumptions);

  const tier = assumptions.tiers[state.tierIdx];
  const mult = assumptions.multipliers[state.tierIdx];
  const storageCost = tier.price;

  let modulesTotal = 0;
  const invPrice = assumptions.modules.inv.base * mult;
  const detPrice = assumptions.modules.det.base * mult;
  const respPrice = assumptions.modules.resp.base * mult;
  const expPrice = assumptions.modules.exp.base * mult;

  if (state.modules.inv) modulesTotal += invPrice;
  if (state.modules.det) modulesTotal += detPrice;
  if (state.modules.resp) modulesTotal += respPrice;
  if (state.modules.exp) modulesTotal += expPrice;

  const subtotal = storageCost + modulesTotal;
  const overSources = assumptions.sourceBuckets[state.sourceBucket].surcharge;
  const surcharge = overSources ? subtotal * assumptions.highVolumeSurcharge : 0;
  const monthlyTotal = subtotal + surcharge;
  const annualMonthlyEquiv = monthlyTotal * (1 - assumptions.annualDiscount);
  const shown = state.billing === 'monthly' ? monthlyTotal : annualMonthlyEquiv;

  const tierMatch = assumptions.tierNames.find((item) => monthlyTotal <= item.max);
  const storageSavingsPct = state.tierIdx >= 1 && state.tierIdx <= 3 ? assumptions.storageSavingsLow : assumptions.storageSavingsHigh;
  const storageSavings = (storageCost * storageSavingsPct) / (1 - storageSavingsPct);
  const moduleSavingsAmt = (modulesTotal * assumptions.moduleSavings) / (1 - assumptions.moduleSavings);
  const totalSavingsAnnual = (storageSavings + moduleSavingsAmt) * 12;
  const annualCostBasis = monthlyTotal * 12;
  const implPrice = annualCostBasis * assumptions.implementation.pct;

  const handleAssumptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const numericValue = parseFloat(value) || 0;

    setAssumptions((prev) => {
      const next = { ...prev };

      if (name === 'highVolSurcharge') {
        next.highVolumeSurcharge = numericValue / 100;
      } else if (name === 'invBase') {
        next.modules.inv.base = numericValue;
      } else if (name === 'detBase') {
        next.modules.det.base = numericValue;
      } else if (name === 'respBase') {
        next.modules.resp.base = numericValue;
      } else if (name === 'expBase') {
        next.modules.exp.base = numericValue;
      } else if (name === 'implPct') {
        next.implementation.pct = numericValue / 100;
      } else if (name === 'savingsLow') {
        next.storageSavingsLow = numericValue / 100;
      } else if (name === 'savingsHigh') {
        next.storageSavingsHigh = numericValue / 100;
      } else if (name === 'savingsMod') {
        next.moduleSavings = numericValue / 100;
      } else if (name === 'annDisc') {
        next.annualDiscount = numericValue / 100;
      } else if (name.startsWith('tierPrice')) {
        const idx = Number(name.replace('tierPrice', ''));
        if (next.tiers[idx]) {
          next.tiers[idx].price = numericValue;
        }
      }

      return next;
    });
  };

  return (
    <main className={styles.pageShell}>
      <div className={styles.wrap}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Every castle needs it</p>
          <h1>Trench pricing calculator</h1>
          <p className={styles.tagline}>Pay only for your outcomes. This is your Trench.</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.contentColumn}>
            <section className={styles.card}>
              <h2>Your castle&apos;s log storage</h2>
              <p className={styles.sub}>This is Trench Agentic SIEM: your security context data lake, the playground of your SecOps agents.</p>
              <select
                className={styles.rangeSelect}
                value={state.tierIdx}
                onChange={(event) => setState((prev) => ({ ...prev, tierIdx: Number(event.target.value) }))}
              >
                {assumptions.tiers.map((tierOption, index) => (
                  <option key={tierOption.label} value={index}>
                    {tierOption.label}
                  </option>
                ))}
              </select>
              <div className={styles.sourcesInline}>
                <label htmlFor="sources">Log sources</label>
                <select
                  id="sources"
                  className={styles.rangeSelectSm}
                  value={state.sourceBucket}
                  onChange={(event) => setState((prev) => ({ ...prev, sourceBucket: Number(event.target.value) }))}
                >
                  {assumptions.sourceBuckets.map((bucket, index) => (
                    <option key={bucket.label} value={index}>
                      {bucket.label}
                    </option>
                  ))}
                </select>
              </div>
            </section>

            <section className={styles.card}>
              <h2>Your SecOps agent stack</h2>
              <p className={styles.sub}>Select the AISecOps automation your team needs - mix and match</p>
              <div className={styles.modulesList}>
                {(['inv', 'det', 'resp', 'exp'] as ModuleKey[]).map((key) => {
                  const module = assumptions.modules[key];
                  const price = module.base * mult;
                  const active = state.modules[key];

                  return (
                    <button
                      key={key}
                      type="button"
                      className={`${styles.module} ${active ? styles.active : ''}`}
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          modules: { ...prev.modules, [key]: !prev.modules[key] },
                        }))
                      }
                    >
                      <div className={styles.moduleHead}>
                        <div className={styles.moduleTitle}>
                          <span className={`${styles.toggle} ${active ? styles.on : ''}`}>
                            <span className={styles.dot} />
                          </span>
                          <span className={styles.name}>{module.name}</span>
                          <span className={styles.lvl}>{module.level}</span>
                        </div>
                        <div className={styles.modulePrice}>{fmt(price)}/mo</div>
                      </div>
                      <ul>
                        {module.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>
              <p className={styles.headlessNote}>Delivered headless, inside your collaboration layer (Slack or Teams) - no new dashboard, no cognitive overload.</p>
            </section>

            <section className={styles.card}>
              <h2>Implementation</h2>
              <p className={styles.sub}>One-time onboarding - not included in the monthly or annual total</p>
              <button
                type="button"
                className={`${styles.module} ${state.implementationOn ? styles.active : ''}`}
                onClick={() => setState((prev) => ({ ...prev, implementationOn: !prev.implementationOn }))}
              >
                <div className={styles.moduleHead}>
                  <div className={styles.moduleTitle}>
                    <span className={`${styles.toggle} ${state.implementationOn ? styles.on : ''}`}>
                      <span className={styles.dot} />
                    </span>
                    <span className={styles.name}>Onboarding &amp; migration</span>
                    <span className={styles.lvl}>One-time</span>
                  </div>
                  <div className={styles.modulePrice}>{fmt(implPrice)}</div>
                </div>
                <ul>
                  {assumptions.implementation.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className={styles.implHint}>{Math.round(assumptions.implementation.pct * 100)}% of your annual cost, updates with your selections</div>
              </button>
            </section>

            <details className={styles.assumptions}>
              <summary>Adjust pricing assumptions</summary>
              <div className={styles.assumpGrid}>
                {[
                  ['High-volume surcharge (%, applies to whole bill)', 'highVolSurcharge', assumptions.highVolumeSurcharge * 100],
                  ['Investigation base ($/mo)', 'invBase', assumptions.modules.inv.base],
                  ['Detection & hunting base ($/mo)', 'detBase', assumptions.modules.det.base],
                  ['Response base ($/mo)', 'respBase', assumptions.modules.resp.base],
                  ['AI security experts (MDR) base ($/mo)', 'expBase', assumptions.modules.exp.base],
                  ['Implementation fee (% of annual cost)', 'implPct', assumptions.implementation.pct * 100],
                  ['Storage savings, up to 100GB (%)', 'savingsLow', assumptions.storageSavingsLow * 100],
                  ['Storage savings, 500GB+ (%)', 'savingsHigh', assumptions.storageSavingsHigh * 100],
                  ['Agent stack savings (%)', 'savingsMod', assumptions.moduleSavings * 100],
                  ['Annual discount (%)', 'annDisc', assumptions.annualDiscount * 100],
                ].map(([label, name, value]) => (
                  <div key={name as string} className={styles.assumpItem}>
                    <label htmlFor={name as string}>{label}</label>
                    <input id={name as string} name={name as string} type="number" value={value as number} onChange={handleAssumptionChange} />
                  </div>
                ))}

                {assumptions.tiers.map((tierOption, index) => (
                  <div key={`${tierOption.label}-${index}`} className={styles.assumpItem}>
                    <label htmlFor={`tierPrice${index}`}>{tierOption.label} base ($/mo)</label>
                    <input id={`tierPrice${index}`} name={`tierPrice${index}`} type="number" value={tierOption.price} onChange={handleAssumptionChange} />
                  </div>
                ))}
              </div>
            </details>

            <p className={styles.footerNote}>Internal planning tool - figures are placeholder assumptions, not published rates.</p>
          </div>

          <aside className={styles.summary}>
            <h2>Your plan</h2>
            <div className={styles.tierName}>{tierMatch?.name}</div>
            <div className={styles.tierLegend}>
              {assumptions.tierNames.map((item) => (
                <div key={item.name} className={`${styles.tierLegendItem} ${item.name === tierMatch?.name ? styles.active : ''}`}>
                  <span className={styles.tlName}>{item.name}</span>
                  <span>{item.desc}</span>
                </div>
              ))}
            </div>
            <div className={styles.row}>
              <span>
                Storage (<span>{tier.label}</span>)
              </span>
              <span>{state.tierIdx === 0 ? 'N/A' : fmt(storageCost)}</span>
            </div>
            <div className={styles.row}>
              <span>Log sources</span>
              <span>{overSources ? `+${fmt(surcharge)}` : 'Included'}</span>
            </div>
            {state.modules.inv ? (
              <div className={styles.row}>
                <span>Investigation (L1)</span>
                <span>{fmt(invPrice)}</span>
              </div>
            ) : null}
            {state.modules.det ? (
              <div className={styles.row}>
                <span>Detection &amp; hunting (L2)</span>
                <span>{fmt(detPrice)}</span>
              </div>
            ) : null}
            {state.modules.resp ? (
              <div className={styles.row}>
                <span>Response (L2)</span>
                <span>{fmt(respPrice)}</span>
              </div>
            ) : null}
            {state.modules.exp ? (
              <div className={styles.row}>
                <span>AI security experts (MDR)</span>
                <span>{fmt(expPrice)}</span>
              </div>
            ) : null}

            <div className={styles.billingToggle}>
              <button
                type="button"
                className={`${state.billing === 'monthly' ? styles.active : ''}`}
                onClick={() => setState((prev) => ({ ...prev, billing: 'monthly' }))}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`${state.billing === 'annual' ? styles.active : ''}`}
                onClick={() => setState((prev) => ({ ...prev, billing: 'annual' }))}
              >
                Annual (-15%)
              </button>
            </div>

            <div className={styles.totalRow}>
              <div>
                <div className={styles.totalLabel}>{state.billing === 'monthly' ? 'Estimated total / month' : 'Estimated total / month (billed annually)'}</div>
                <div className={styles.totalVal}>{fmt(shown)}/mo</div>
              </div>
            </div>
            {state.billing === 'annual' ? <div className={styles.totalSub}>{fmt(shown * 12)} billed annually</div> : null}
            {totalSavingsAnnual > 0 ? <div className={styles.savingsNote}>You&apos;re saving ~{fmt(totalSavingsAnnual)}/year vs market rates on this plan</div> : null}
            {state.implementationOn ? (
              <div className={styles.implRow}>
                <span>Implementation (one-time)</span>
                <span>{fmt(implPrice)}</span>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </main>
  );
}
