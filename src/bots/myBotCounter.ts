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
            // Randomise between playing dynamite and water in high-stakes situations
            // const highStakesThreshold = Math.min(1, (2 * this.drawCount) / 10);
            // console.log(highStakesThreshold);
            // const highStakes = Math.random() < highStakesThreshold;
            const highStakes = this.drawCount >= 2;
            if ((highStakes && this.dynamiteCounter-- > 0 && Math.random() < 0.5) || (Math.random() < 0.1 && this.dynamiteCounter > 0)) {
                return 'D';
            }
            else if (highStakes) {
                return 'W';
            }
            /* Randomise between:
                - A random move
                - The counter to the opponent's last move
                - The counter to what the opponent would play if they're trying to counter my last move
            */
            if (Math.random() < this.RANDOM_PROB) {
                // Choose a random move from the basic ones
                const basicMoves: BotSelection[] = ['R', 'P', 'S'];
                return basicMoves[Math.floor(Math.random() * basicMoves.length)];
            }
            else if (Math.random() < this.RANDOM_PROB + this.COUNTER_COUNTER_PROB) {
                // Try to counter an intelligent opponent
                const counterMove: BotSelection = this.counter(this.counter(gamestate.rounds.at(-1).p1));
                return counterMove;
            }
            else {
                // Try to counter an opponent who plays consistent moves by playing the counter to their previous move
                const counterMove: BotSelection = this.counter(gamestate.rounds.at(-1).p2);
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
