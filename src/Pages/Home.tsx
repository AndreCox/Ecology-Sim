import React, { useState, useEffect } from 'react';
import Sketch from 'react-p5';
import type p5Types from 'p5';
import { store } from '../Store';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

interface AppProps {}

class Wolf {
  private wonderRandomness: number;
  private heading: number;
  public hunger: number;
  constructor(public x: number, public y: number) {
    this.x = x;
    this.y = y;
    this.wonderRandomness = 0.1;
    this.heading = Math.random() * Math.PI * 2;
    this.hunger = 100;
  }

  move(p5: p5Types) {
    // move in the direction of the heading
    this.x += Math.cos(this.heading) * 1;
    this.y += Math.sin(this.heading) * 1;

    // change the heading if the sheep goes off the screen
    if (this.x < 0) {
      this.heading = Math.PI - this.heading;
    }
    if (this.x > p5.width) {
      this.heading = Math.PI - this.heading;
    }
    if (this.y < 0) {
      this.heading = -this.heading;
    }
    if (this.y > p5.height) {
      this.heading = -this.heading;
    }

    // change the heading randomly
    this.heading += Math.random() * this.wonderRandomness;

    // change the randomness of the wonder
    this.wonderRandomness = (Math.random() * 2 - 1) * 0.5;

    // change the hunger
    this.hunger -= 0.1;
  }

  draw(p5: p5Types) {
    p5.fill(255, 0, 0);
    p5.ellipse(this.x, this.y, 10, 10);
  }

  eat(grass: number[]) {
    // check the location of the grass and set the heading to that location
    // angle of grass
    const angle = Math.atan2(grass[1] - this.y, grass[0] - this.x);

    // change the heading to the angle of the grass
    this.heading = this.heading + (angle - this.heading) * 0.1;
  }
}

class Sheep {
  private wonderRandomness: number;
  private heading: number;
  public hunger: number;
  constructor(public x: number, public y: number) {
    this.x = x;
    this.y = y;
    this.wonderRandomness = 0.1;
    this.heading = Math.random() * Math.PI * 2;
    this.hunger = 100;
  }

  move(p5: p5Types) {
    // move in the direction of the heading
    this.x += Math.cos(this.heading) * 1;
    this.y += Math.sin(this.heading) * 1;

    // change the heading if the sheep goes off the screen
    if (this.x < 0) {
      this.heading = Math.PI - this.heading;
    }
    if (this.x > p5.width) {
      this.heading = Math.PI - this.heading;
    }
    if (this.y < 0) {
      this.heading = -this.heading;
    }
    if (this.y > p5.height) {
      this.heading = -this.heading;
    }

    // change the heading randomly
    this.heading += Math.random() * this.wonderRandomness;

    // change the randomness of the wonder
    this.wonderRandomness = (Math.random() * 2 - 1) * 0.5;

    // change the hunger
    this.hunger -= 0.1;
  }

  eat(grass: number[]) {
    // check the location of the grass and set the heading to that location
    // angle of grass
    const angle = Math.atan2(grass[1] - this.y, grass[0] - this.x);

    // change the heading to the angle of the grass
    this.heading = this.heading + (angle - this.heading) * 0.1;
  }

  draw(p5: p5Types) {
    p5.fill(0, 0, 255);
    p5.ellipse(this.x, this.y, 10, 10);
  }
}

class Grass {
  private growthRate = 0.1;
  public newGrowth = 0;
  constructor(public x: number, public y: number) {
    this.x = x;
    this.y = y;
    this.growthRate = 0.2 * Math.random();
  }

  draw(p5: p5Types) {
    p5.fill(0, 255, 0);
    p5.ellipse(this.x, this.y, 10, 10);

    this.newGrowth += this.growthRate;
  }
}

let grasses: any = [];
let sheeps: any = [];

let wolfs: { draw: (arg0: p5Types) => void; move: (arg0: p5Types) => void }[] =
  [];

const resetSimulation = () => {
  grasses = [];
  sheeps = [];
  wolfs = [];

  for (let i = 0; i < 25; i++) {
    //get canvas size
    

};

const Home = observer(({}: AppProps) => {
  // Return the App component.

  //See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);

    // add the grass
    for (let i = 0; i < 25; i++) {
      grasses.push(new Grass(p5.random(0, 500), p5.random(0, 500)));
    }

    // add the sheep
    for (let i = 0; i < 5; i++) {
      sheeps.push(new Sheep(p5.random(0, 500), p5.random(0, 500)));
    }

    // add the wolfs
    for (let i = 0; i < 5; i++) {
      wolfs.push(new Wolf(p5.random(0, 500), p5.random(0, 500)));
    }
  };

  const draw = (p5: p5Types) => {
    p5.background(255);

    // draw the grass
    for (let i = 0; i < grasses.length; i++) {
      grasses[i].draw(p5);
    }
    // draw the sheep
    for (let i = 0; i < sheeps.length; i++) {
      sheeps[i].move(p5);
      sheeps[i].draw(p5);
    }
    // draw the wolfs
    for (let i = 0; i < wolfs.length; i++) {
      wolfs[i].move(p5);
      wolfs[i].draw(p5);
    }

    // check for sheep and wolf collisions
    wolfs.forEach((wolf) => {
      sheeps.forEach((sheep) => {
        if (
          sheep.x - wolf.x < 10 &&
          sheep.x - wolf.x > -10 &&
          sheep.y - wolf.y < 10 &&
          sheep.y - wolf.y > -10
        ) {
          // remove the sheep
          sheeps.splice(sheeps.indexOf(sheep), 1);
          // add a new wolf at the sheep's location
          wolfs.push(new Wolf(sheep.x, sheep.y));
        }
      });
    });

    // check for sheep and grass collisions
    sheeps.forEach((sheep) => {
      grasses.forEach((grass) => {
        if (
          grass.x - sheep.x < 10 &&
          grass.x - sheep.x > -10 &&
          grass.y - sheep.y < 10 &&
          grass.y - sheep.y > -10
        ) {
          // remove the grass
          grasses.splice(grasses.indexOf(grass), 1);
          // add a new sheep at the grass's location
          sheeps.push(new Sheep(grass.x, grass.y));
        }
      });
    });

    // check for hunger
    sheeps.forEach((sheep) => {
      if (sheep.hunger < 0) {
        sheeps.splice(sheeps.indexOf(sheep), 1);
      }
    });

    // check for hunger
    wolfs.forEach((wolf) => {
      if (wolf.hunger < 0) {
        wolfs.splice(wolfs.indexOf(wolf), 1);
      }
    });

    // check for new grass growth
    grasses.forEach((grass) => {
      if (grass.newGrowth > 75) {
        grasses.push(new Grass(p5.random(0, 500), p5.random(0, 500)));
        grass.newGrowth = 0;
      }
    });

    // check for close grasses to sheep and then pass the position of the closest grass to the sheep
    sheeps.forEach((sheep) => {
      let distances: number[] = [];
      grasses.forEach((grass) => {
        distances.push(
          Math.sqrt(
            Math.pow(grass.x - sheep.x, 2) + Math.pow(grass.y - sheep.y, 2),
          ),
        );
      });
      let closestGrass = Math.min(...distances);
      if (closestGrass < 100) {
        sheep.eat([
          grasses[distances.indexOf(closestGrass)].x,
          grasses[distances.indexOf(closestGrass)].y,
        ]);
      }
    });

    // check for close sheeps to wolf and then pass the position of the closest sheep to the wolf
    wolfs.forEach((wolf) => {
      let distances: number[] = [];
      sheeps.forEach((sheep) => {
        distances.push(
          Math.sqrt(
            Math.pow(sheep.x - wolf.x, 2) + Math.pow(sheep.y - wolf.y, 2),
          ),
        );
      });
      let closestSheep = Math.min(...distances);
      if (closestSheep < 100) {
        wolf.eat([
          sheeps[distances.indexOf(closestSheep)].x,
          sheeps[distances.indexOf(closestSheep)].y,
        ]);
      }
    });
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  const data = {
    datasets: [
      {
        label: 'Sheep',

        fill: false,
        lineTension: 0.4,
        backgroundColor: '#0000FF',
        borderColor: '#0000FF',
        borderJoinStyle: 'miter',
        pointRadius: 0,
        showLine: true,
        data: [],
      },

      {
        label: 'Wolfs',

        fill: false,
        lineTension: 0.4,
        backgroundColor: '#FF0000',
        borderColor: '#FF0000',
        borderJoinStyle: 'miter',
        pointRadius: 0,
        showLine: true,
        data: [],
      },

      {
        label: 'Grass',

        fill: false,
        lineTension: 0.4,
        backgroundColor: '#00FF00',
        borderColor: '#00FF00',
        borderJoinStyle: 'miter',
        pointRadius: 0,
        showLine: true,
        data: [],
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          type: 'realtime',
          realtime: {
            onRefresh: function () {
              data.datasets[0].data.push({
                x: Date.now(),
                y: sheeps.length,
              });
              data.datasets[1].data.push({
                x: Date.now(),
                y: wolfs.length,
              });
              data.datasets[2].data.push({
                x: Date.now(),
                y: grasses.length,
              });
            },
            delay: 300,
            refresh: 300,
            duration: 30000,
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            fontFamily: 'Arial',
            labelString: 'Number',
            fontSize: 20,
            fontColor: '#6c757d',
          },
          ticks: {
            max: 100,
            min: 0,
          },
        },
      ],
    },
  };

  return (
    <div className="">
      <div className="flex flex-row w-full justify-center">
        <Sketch setup={setup} draw={draw} />
      </div>
      <div className="bg-white">
        <Line data={data} options={options} />
      </div>
    </div>
  );
});

export default Home;
