import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {
    dynamiteCounter: number = 100;

    makeMove(gamestate: Gamestate): BotSelection {
        // Use dynamite unpredictably, with probability 1/5
        if (this.dynamiteCounter-- > 0 && Math.random() > 0.2) {
            return 'D';
        }
        const allMoves: BotSelection[] = ['R', 'P', 'S'];
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
                const basicMoves: BotSelection[] = ['R', 'P', 'S'];
                return basicMoves[Math.floor(Math.random() * basicMoves.length)];
        }
    }
}

export = new Bot();
