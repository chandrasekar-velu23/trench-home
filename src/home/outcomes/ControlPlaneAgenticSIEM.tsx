import styles from './index.module.css';

const ControlPlaneAgenticSIEM = () => {
  return (
    <div className={styles.controlPlaneAgenticSiem}>
      <div className={styles.headingParent}>
        <b className={styles.heading}>Control Plane</b>
        <div className={styles.subtitle}>Agentic SIEM</div>
      </div>
      <div className={styles.flow}>Correlate   →   Detect   →   Reason   →   Prioritize</div>
      <img className={styles.controlPlane1} src="/outcomes/control-plane.webp" alt="Control Plane Agentic SIEM" />
    </div>
  );
};

export default ControlPlaneAgenticSIEM;
