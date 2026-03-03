import Card from './Card';
import '../styles/Board.css';

export default function Board({ cards, flipped, matched, onCardClick }) {
    return (
        <div className="board-wrapper">
            <div className="board">
                {cards.map((card) => (
                    <Card
                        key={card.uid}
                        card={card}
                        isFlipped={flipped.includes(card.uid)}
                        isMatched={matched.has(card.uid)}
                        onClick={() => onCardClick(card.uid)}
                    />
                ))}
            </div>
        </div>
    );
}
