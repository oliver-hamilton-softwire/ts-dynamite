import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {
    dynamiteCounter: number = 100;
    // Use dynamite unpredictably, with probability 1/5
    DYNAMITE_PROB: number = 0.2

    makeMove(gamestate: Gamestate): BotSelection {
        // Play dynamite randomly, and only if we haven't run out
        if (this.dynamiteCounter-- > 0 && Math.random() > this.DYNAMITE_PROB) {
            return 'D';
        }
        const counterMove: BotSelection = this.counter(gamestate.rounds.at(-1).p2);
        // Play the counter to the opponent's previous move
        return counterMove;
    }

    counter(lastMove: BotSelection): BotSelection {
        switch (lastMove) {
            case 'R':
                return 'P';
            case 'P':
                return 'S';
            case 'S':
                return 'R';
            case 'D':
                return 'W';
            case 'W':
                // Choose a random move from 'R', 'P', and 'S', each with equal probability
                const basicMoves: BotSelection[] = ['R', 'P', 'S'];
                return basicMoves[Math.floor(Math.random() * basicMoves.length)];
        }
    }
}

export = new Bot();
