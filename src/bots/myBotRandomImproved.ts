import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {
    dynamiteCounter: number = 100;
    // Use dynamite unpredictably, with probability 1/2
    // DYNAMITE_PROB: number = 0.5;
    drawCount: number = 0
    // Play a random move with some probability
    RANDOM_PROB: number = 1;
    // Play the counter to what the opponent would play if they're trying to counter my last move
    COUNTER_COUNTER_PROB: number = 1/3;

    updateDrawCount(p1Move: BotSelection, p2Move: BotSelection) {
        if (p1Move == p2Move) {
            this.drawCount++;
        }
        else {
            this.drawCount = 0;
        }
    }

    makeMove(gamestate: Gamestate): BotSelection {
        if (gamestate.rounds.length > 0) {
            const lastMove = gamestate.rounds.at(-1);
            this.updateDrawCount(lastMove.p1, lastMove.p2);
            // Choose dynamite only in high-stakes situations
            const highStakes = this.drawCount >= 2;
            if (highStakes && this.dynamiteCounter-- > 0) {
                return 'D';
            }
            const counterMove: BotSelection = this.counter(this.counter(gamestate.rounds.at(-1).p1));
            return counterMove;
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
