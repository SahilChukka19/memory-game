import { motion } from 'framer-motion';
import '../styles/GameHeader.css';

function RestartIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
        </svg>
    );
}

export default function GameHeader({ moves, timeDisplay, onRestart }) {
    return (
        <header className="game-header">
            <motion.h1
                className="game-header__title"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                Memory Garden
            </motion.h1>

            <motion.p
                className="game-header__subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                Flip cards and find all matching pairs
            </motion.p>

            <motion.div
                className="game-header__stats"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
            >
                <div className="stat-item">
                    <span className="stat-item__value">{moves}</span>
                    <span className="stat-item__label">Moves</span>
                </div>

                <div className="stat-divider" />

                <div className="stat-item">
                    <span className="stat-item__value">{timeDisplay}</span>
                    <span className="stat-item__label">Time</span>
                </div>
            </motion.div>

            <motion.button
                className="restart-btn"
                onClick={onRestart}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Restart game"
            >
                <RestartIcon />
                New Game
            </motion.button>
        </header>
    );
}
