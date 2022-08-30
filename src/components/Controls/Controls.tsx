import React from 'react';
import Icon from '../Icon';
import { Svg } from '../../interfaces/Svg';
import styles from './Controls.module.scss';
import { iconIds } from '../../utils/config/iconIds';

const Controls = () => {
  const blockName = 'controls';

  return (
    <div className={styles.controls}>
      <div className={styles.controls__progressBar}></div>
      <div className={`${styles.controls__inner} _container`}>
        <div className={styles.controls__mainControls}>
          <button>
            <Icon id={iconIds.prev} width='2.5em' height='2.5em' blockName={blockName} fill='#E5E5E5'/>
          </button>
          <button>
            <Icon id={iconIds.play} width='3em' height='3em' blockName={blockName} fill='#E5E5E5' />
          </button>
          <button>
            <Icon id={iconIds.next} width='2.5em' height='2.5em' blockName={blockName} fill='#E5E5E5'/>
          </button>
          <button>
            <Icon id={iconIds.repeat} fill='#E5E5E5' width='3em' height='3em' blockName={blockName}/>
          </button>
          <button>
            <Icon id={iconIds.playlists} fill='#E5E5E5' width='3em' height='3em' blockName={blockName}/>
          </button>
            <div className={styles.controls__trackInfo}>
            <figure className={styles.controls__trackCoverWrapper}>
              <img src="https://upload.wikimedia.org/wikipedia/ru/c/cf/Breaking_Benjamin_Phobia_2006.jpg" alt=""/>
            </figure>
            <div className={styles.controls__trackDetails}>
              <p className={`${styles.controls__trackTitle} _text`}>Breath</p>
              <p className={`${styles.controls__artist} _text`}>Breaking Benjamin</p>
            </div>
          </div>
        </div>
        <div className={styles.controls__secondaryControls}>
          <button>
            <Icon id={iconIds.dots} fill='#E5E5E5' width='3em' height='3em' blockName={blockName}/>
          </button>
          <button>
            <Icon id={iconIds.mid} fill='#E5E5E5' width='3em' height='3em' blockName={blockName}/>
          </button>
          <button>
            <Icon id={iconIds.shuffle} fill='#E5E5E5' width='3em' height='3em' blockName={blockName}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Controls;