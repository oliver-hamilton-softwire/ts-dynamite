import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {
    makeMove(gamestate: Gamestate): BotSelection {
        const allMoves: BotSelection[] = ['R', 'P', 'S'];
        // Choose a random move, with equal probability for each
        return allMoves[Math.floor(Math.random() * allMoves.length)];
    }
}

export = new Bot();