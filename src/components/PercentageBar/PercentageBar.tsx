import React, { ReactElement } from 'react'
import styles from './PercentageBar.module.scss'

interface Props {
    leftVotes: number;
    rightVotes: number;
}

function PercentageBar({ leftVotes, rightVotes }: Props): ReactElement {
    const leftPercentTage = leftVotes / (leftVotes + rightVotes) * 100
    const rightPercentTage = rightVotes / (leftVotes + rightVotes) * 100
    return (
        <div className={styles.bar}>
            {leftVotes + rightVotes > 0 &&
                <>
                    <div className={styles.leftSide} style={{ width: `${leftPercentTage}%` }}>
                        <span className={styles.percentage}>{Math.trunc(leftPercentTage)}%</span>
                    </div>
                    <div className={styles.rightSide} style={{ width: `${rightPercentTage}%` }}>
                        <span className={styles.percentage}>{Math.trunc(rightPercentTage)}%</span>
                    </div>
                </>

            }
        </div>
    )
}

export default PercentageBar
