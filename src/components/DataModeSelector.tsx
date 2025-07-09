import React, { useState } from 'react';
import { DataMode, DATA_MODES } from '../config/dataModes';
import styles from './DataModeSelector.module.css';

interface DataModeSelectorProps {
  currentMode: DataMode;
  onModeChange: (mode: DataMode) => void;
}

const DataModeSelector: React.FC<DataModeSelectorProps> = ({ 
  currentMode, 
  onModeChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModeSelect = (mode: DataMode) => {
    if (DATA_MODES[mode].available) {
      onModeChange(mode);
      setIsOpen(false);
    }
  };

  const currentConfig = DATA_MODES[currentMode];

  return (
    <div className={styles.container}>
      <div className={styles.selector}>
        <button 
          className={styles.trigger}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className={styles.currentMode}>
            {currentConfig.label}
          </span>
          <span className={styles.arrow}>
            {isOpen ? '▲' : '▼'}
          </span>
        </button>

        {isOpen && (
          <div className={styles.dropdown}>
            {Object.values(DATA_MODES).map((config) => (
              <button
                key={config.mode}
                className={`${styles.option} ${
                  config.mode === currentMode ? styles.active : ''
                } ${
                  !config.available ? styles.disabled : ''
                }`}
                onClick={() => handleModeSelect(config.mode)}
                disabled={!config.available}
              >
                <div className={styles.optionContent}>
                  <span className={styles.optionLabel}>
                    {config.label}
                  </span>
                  <span className={styles.optionDescription}>
                    {config.description}
                  </span>
                  {config.requiresSetup && (
                    <span className={styles.requiresSetup}>
                      {config.requiresSetup}
                    </span>
                  )}
                </div>
                {config.mode === currentMode && (
                  <span className={styles.checkmark}>✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.info}>
        <span className={styles.infoLabel}>Data Source:</span>
        <span className={styles.infoValue}>{currentConfig.description}</span>
      </div>
    </div>
  );
};

export default DataModeSelector;
