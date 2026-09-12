import styles from './index.module.css';

const DataPlaneTelemetryOptimizer = () => {
  return (
    <div className={styles.dataPlaneTelemetryOptimiz}>
      <div className={styles.headingParent}>
        <b className={styles.heading}>Data Plane</b>
        <div className={styles.subtitle}>Telemetry Optimizer</div>
      </div>
      <div className={styles.flow}>Collect   →   Normalize   →   Enrich   →   Optimize</div>
      <img className={styles.dataPlane1} src="/outcomes/data-plane.webp" alt="Data Plane Telemetry Optimizer" />
    </div>
  );
};

export default DataPlaneTelemetryOptimizer;
