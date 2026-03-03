import { useState, useEffect, useCallback, useRef } from 'react';
import { shuffle } from '../utils/shuffle';

const CARD_DATA = [
    { id: 1, emoji: '🌿', label: 'Fern' },
    { id: 2, emoji: '🕯️', label: 'Candle' },
    { id: 3, emoji: '☕', label: 'Latte' },
    { id: 4, emoji: '📚', label: 'Books' },
    { id: 5, emoji: '🎋', label: 'Bamboo' },
    { id: 6, emoji: '🌸', label: 'Blossom' },
    { id: 7, emoji: '🍵', label: 'Green Tea' },
    { id: 8, emoji: '🌙', label: 'Moon' },
    { id: 9, emoji: '🫐', label: 'Berries' },
];

function buildDeck() {
    const paired = CARD_DATA.flatMap((card) => [
        { ...card, uid: `${card.id}-a` },
        { ...card, uid: `${card.id}-b` },
    ]);
    return shuffle(paired);
}

export function useGameLogic() {
    const [cards, setCards] = useState(buildDeck);
    const [flipped, setFlipped] = useState([]);       // uids of currently face-up cards (max 2)
    const [matched, setMatched] = useState(new Set()); // uids of matched cards
    const [moves, setMoves] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [started, setStarted] = useState(false);
    const [isWon, setIsWon] = useState(false);
    const lockRef = useRef(false);
    const timerRef = useRef(null);

    // timer
    useEffect(() => {
        if (started && !isWon) {
            timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
        }
        return () => clearInterval(timerRef.current);
    }, [started, isWon]);

    // win check
    useEffect(() => {
        if (matched.size === CARD_DATA.length * 2) {
            setIsWon(true);
        }
    }, [matched]);

    const flipCard = useCallback((uid) => {
        if (lockRef.current) return;
        if (matched.has(uid)) return;
        if (flipped.includes(uid)) return;
        if (flipped.length === 2) return;

        if (!started) setStarted(true);

        const next = [...flipped, uid];
        setFlipped(next);

        if (next.length === 2) {
            setMoves((m) => m + 1);
            const [a, b] = next;
            const cardA = cards.find((c) => c.uid === a);
            const cardB = cards.find((c) => c.uid === b);

            if (cardA.id === cardB.id) {
                // match!
                setMatched((prev) => new Set([...prev, a, b]));
                setFlipped([]);
            } else {
                // no match — lock and flip back after delay
                lockRef.current = true;
                setTimeout(() => {
                    setFlipped([]);
                    lockRef.current = false;
                }, 900);
            }
        }
    }, [flipped, matched, cards, started]);

    const restart = useCallback(() => {
        clearInterval(timerRef.current);
        setCards(buildDeck());
        setFlipped([]);
        setMatched(new Set());
        setMoves(0);
        setSeconds(0);
        setStarted(false);
        setIsWon(false);
        lockRef.current = false;
    }, []);

    const formatTime = (s) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    return {
        cards,
        flipped,
        matched,
        moves,
        timeDisplay: formatTime(seconds),
        isWon,
        flipCard,
        restart,
    };
}
