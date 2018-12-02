import React, { Component } from "react";
import "./styles.scss";
import BeerPoints from "./Points";
import GridItem from "./GridItem";
import "./home.font";

class HomeSPA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      iconArray: [],
      lastKittenPosition: null,
      kittenPosition: null,
      backgroundColor: { r: null, g: null, b: null }
    };
    this.clickKitty = this.clickKitty.bind(this);
  }
  clickKitty(e) {
    e.preventDefault();
    this.setState({ count: this.state.count + 1 });
    this.loadArrayData();
  }
  componentWillMount() {
    this.loadArrayData();
  }
  componentDidMount() {
    const time = 2000 - this.state.count * 250;
    this.timer = setInterval(() => {
      this.loadArrayData();
      this.setBackgroundColor();
    }, 1250);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  setIcon(element) {
    let randIcon = Math.floor(Math.random() * 3);
    //different random number for direction
    let randDir = Math.floor(Math.random() * 3);
    const data = {
      id: element,
      icon: randIcon,
      direction: randDir
    };
    return data;
  }

  //for rapid individual icon updates
  //   async updateIcon() {
  //     let randElement = Math.floor(Math.random() * 139);
  //     if (randElement !== this.state.kittenPosition) {
  //       const data = this.setIcon(randElement);
  //       this.state.iconArray.splice(randElement, 1, data);
  //       this.setState({ iconArray: this.state.iconArray });
  //     }
  //   }
  loadArrayData() {
    let array = [];
    for (let i = 0; i < 140; i++) {
      array.push(this.setIcon(i));
    }
    this.setState(
      {
        iconArray: array
      },
      () => {
        this.addCatData();
      }
    );
  }

  setBackgroundColor() {
    const r = Math.floor(Math.random() * 250);
    const g = Math.floor(Math.random() * 250);
    const b = Math.floor(Math.random() * 250);

    this.setState({
      backgroundColor: {
        r: r,
        g: g,
        b: b
      }
    });
    console.log(this.state.backgroundColor);
  }

  addCatData() {
    //replace a random icon with a new cat icon
    let randIndex = Math.floor(Math.random() * 139);
    this.setState({ kittenPosition: randIndex });
    this.state.iconArray.splice(randIndex, 1, {
      id: randIndex,
      icon: 3
    });
    let current = this.state.lastKittenPosition;
    if (current !== null) {
      //replace current cat icon with a non-cat icon
      this.state.iconArray.splice(current, 1, this.setIcon(current));
    } else {
      this.setState({ lastKittenPosition: randIndex });
    }
  }

  render() {
    const r = this.state.backgroundColor.r;
    const g = this.state.backgroundColor.g;
    const b = this.state.backgroundColor.b;
    return (
      <div id="mainContainer">
        <div id="headerContainer">
          <h1>Welcome to the Clickin' Kitten!</h1>
          <div id="scoreContainer">
            <h2>Score:</h2>
            {this.state.count > 0 ? (
              <BeerPoints count={this.state.count} />
            ) : (
              <div />
            )}
          </div>
        </div>

        <div id="gameContainer">
          {this.state.count < 10 ? (
            <div id="grid" style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}>
              {this.state.iconArray.map((item, index) => {
                return (
                  <GridItem key={index} data={item} onClick={this.clickKitty} />
                );
              })}
            </div>
          ) : (
            <div id="winScreen">
              <h1>WINNER!</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default HomeSPA;
