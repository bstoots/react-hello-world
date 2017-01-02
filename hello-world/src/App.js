import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './tictactoe.css';

class HorizontalRule extends Component {
  render() {
    return (
      <hr/>
    );
  }
}

{/*
class Square extends Component {
  render() {
    return(
      <button className="square" onClick={() => this.props.onClick()}>{this.props.value}</button>
    );
  }
}
*/}

// Since Square is now stateless we can use this simplified syntax, neat!
function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>{props.value}</button>
  );
}

{/*
@TODO - Figure out how to comment stuff in JSX
class Board extends Component {
  // 
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }
  // 
  render() {
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
*/}

function Board(props) {
  return (
    <div>
      <div className="status">Status</div>
      <div className="board-row">
        <Square value={props.squares[0]} onClick={() => props.onClick(0)} />
        <Square value={props.squares[1]} onClick={() => props.onClick(1)} />
        <Square value={props.squares[2]} onClick={() => props.onClick(2)} />
      </div>
      <div className="board-row">
        <Square value={props.squares[3]} onClick={() => props.onClick(3)} />
        <Square value={props.squares[4]} onClick={() => props.onClick(4)} />
        <Square value={props.squares[5]} onClick={() => props.onClick(5)} />
      </div>
      <div className="board-row">
        <Square value={props.squares[6]} onClick={() => props.onClick(6)} />
        <Square value={props.squares[7]} onClick={() => props.onClick(7)} />
        <Square value={props.squares[8]} onClick={() => props.onClick(8)} />
      </div>
    </div>
  );
}

class Game extends Component {
  // 
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0
    };
  }

  // 
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = playerSymbol(this.state.xIsNext);
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true
    });
  }

  // 
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 
        'Move #' + move :
        'Game Start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });
    
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    }
    else {
      status = 'Next player: ' + playerSymbol(this.state.xIsNext);
    }
    return(
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <HorizontalRule/>

        <Game/>

      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// 
function playerSymbol(xIsNext) {
  return xIsNext ? 'X' : 'O';
}

export default App;
