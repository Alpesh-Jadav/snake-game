
import React, { Component } from 'react'
import Snake from './Snake'

import Food from './Food'


const getRandomCoordinates =() => {
  let min = 1;
  let max= 98;

  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;

  return [x,y]

}


const initialState = {

  food: getRandomCoordinates(),
  direction: 'RIGHT',
  speed: 150,
  snakeDots: [
    [0,0],
    [2,0]
  ]

}



export default class App extends Component {

  state = initialState;

  componentDidMount = () => {


    setInterval(this.moveSnake, this.state.speed);
    // document.onkeydown = this.onkeydown();
    document.addEventListener('keydown', (e) => {
      this.onkeydown(e);
    });
  }

  componentDidUpdate() {

    this.checkIfOutOfBorder();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  onkeydown = (event) => {



     let e = event || window.event;
    
    if (e.keyCode === 38){
        this.setState({direction: 'UP'});

    } else if (e.keyCode === 40){
         this.setState({direction: 'DOWN'});

      } else if (e.keyCode === 37){
          this.setState({direction: 'LEFT'});

      } else if (e.keyCode === 39){
          this.setState({direction: 'RIGHT'});

      }

  }



  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) { 
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
         head = [head[0] - 2, head[1]];
         break;
     case 'DOWN':
            head = [head[0] , head[1]+ 2];
          break;
      case 'UP':
          head = [head[0], head[1] - 2];
          break;

      default: break;
    }

    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots
    })
  }

  checkIfOutOfBorder(){
    let head = this.state.snakeDots[this.state.snakeDots.length -1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot =>{
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    })
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }
  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 1000
      })
    }
  }

  onGameOver() {
    alert (`Game Ov er. Snake length is ${this.state.snakeDots.length}`);
    this.setState(initialState)
  } 
  render() {
    return (

      <div className="game-area">

        <Snake  snakeDots={this.state.snakeDots}/>
        <Food dot={this.state.food}/>
        
      </div>
    )
  }
}
