import '../styles/Card.css';

export default function Card({ card, isFlipped, isMatched, onClick }) {
    return (
        <div
            id={`card-${card.uid}`}
            className={`card-container${isFlipped ? ' card-container--flipped' : ''}${isMatched ? ' card-container--matched' : ''}`}
            onClick={onClick}
            role="button"
            aria-label={isFlipped || isMatched ? card.label : 'Hidden card'}
            aria-pressed={isFlipped || isMatched}
        >
            <div
                className={`card-inner${isFlipped || isMatched ? ' card-inner--flipped' : ''}`}
            >
                {/* Back face */}
                <div className="card-face card-face--back" />

                {/* Front face */}
                <div className="card-face card-face--front">
                    <span className={`card-emoji${isMatched ? ' card-emoji--matched' : ''}`}>
                        {card.emoji}
                    </span>
                    <span className="card-label">{card.label}</span>
                </div>
            </div>
        </div>
    );
}
