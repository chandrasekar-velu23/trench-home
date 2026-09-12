import styles from './index.module.css';

const ActionPlaneAgenticSOC = () => {
  return (
    <div className={styles.actionPlaneAgenticSoc}>
      <div className={styles.headingParent}>
        <b className={styles.heading}>Action Plane</b>
        <div className={styles.subtitle}>Agentic SOC</div>
      </div>
      <div className={styles.flow}>Investigate   →   Remediate   →   Respond   →   Automate</div>
      <img className={styles.actionPlane1} src="/outcomes/action-plane.webp" alt="Action Plane Agentic SOC" />
    </div>
  );
};

export default ActionPlaneAgenticSOC;
