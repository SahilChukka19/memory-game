import { motion, AnimatePresence } from 'framer-motion';
import '../styles/WinModal.css';

export default function WinModal({ moves, timeDisplay, onPlayAgain }) {
    return (
        <AnimatePresence>
            <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
            >
                <motion.div
                    className="modal-card"
                    initial={{ opacity: 0, scale: 0.82, y: 32 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 16 }}
                    transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
                >
                    <motion.span
                        className="modal-confetti"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.3, 1] }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                    >
                        🌸
                    </motion.span>

                    <h2 className="modal-title">All pairs found!</h2>
                    <p className="modal-subtitle">You have a sharp eye for detail.</p>

                    <div className="modal-stats">
                        <div className="modal-stat">
                            <span className="modal-stat__value">{moves}</span>
                            <span className="modal-stat__label">Moves</span>
                        </div>
                        <div className="modal-stat-divider" />
                        <div className="modal-stat">
                            <span className="modal-stat__value">{timeDisplay}</span>
                            <span className="modal-stat__label">Time</span>
                        </div>
                    </div>

                    <motion.button
                        className="modal-play-again"
                        onClick={onPlayAgain}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Play Again
                    </motion.button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
