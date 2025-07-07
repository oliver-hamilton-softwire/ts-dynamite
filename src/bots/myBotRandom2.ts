import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {
    dynamiteCounter: number = 100;
    // Use dynamite unpredictably, with probability 1/2
    DYNAMITE_PROB: number = 0.5;
    // Play a random move with some probability
    RANDOM_PROB: number = 0.3;

    makeMove(gamestate: Gamestate): BotSelection {
        // Play dynamite randomly, and only if we haven't run out
        if (this.dynamiteCounter-- > 0 && Math.random() > this.DYNAMITE_PROB) {
            return 'D';
        }
        // Only play the counter if there is a previous move
        if (gamestate.rounds.length > 0) {
            if (Math.random() < this.RANDOM_PROB) {
                const basicMoves: BotSelection[] = ['R', 'P', 'S'];
                return basicMoves[Math.floor(Math.random() * basicMoves.length)];
            
            }
            else {
                const counterMove: BotSelection = this.counter(gamestate.rounds.at(-1).p2);
                // Play the counter to the opponent's previous move with some probability
                return counterMove;
            }
        }
        else {
            // Just return 'R' if there is no previous move
            return 'R';
        }
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
                // Choose a random move from 'R', 'P', 'S', and 'W', each with equal probability
                const basicMoves: BotSelection[] = ['R', 'P', 'S', 'W'];
                return basicMoves[Math.floor(Math.random() * basicMoves.length)];
        }
    }
}

export = new Bot();
