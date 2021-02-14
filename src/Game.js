'use strict';

const MAX_FRAMES = 10;
const MAX_SCORE = 10;
const MIN_SCORE = 0;

class Game{
  constructor(frameClass = Frame){
    this.frames = []
    for (let i = 1; i < MAX_FRAMES; i++) {
      this.frames.push(new frameClass())
    }
    this.frames.push(new LastFrame())
    this.frame_counter = 0
  }

  run(roll){
    console.log(this.CurrentFrame());
    this.CurrentFrame().AddRolls(roll);
    console.log(this.CurrentFrame());
    console.log(this.PreviousFrame());
    if(this.CurrentFrame().isFinished()){
      this.UpdatePreviousFrame();
      this.NextFrame();
    }
    console.log(this.PreviousFrame());
    console.log(this.FrameBeforeLast());
  }

  NextFrame(){
    return this.frame_counter += 1;
  }

  CurrentFrame(){
    return this.frames[this.frame_counter];
  }

  PreviousFrame(){
    return this.frames[this.frame_counter - 1];
  }

  FrameBeforeLast(){
    return this.frames[this.frame_counter - 2];
  }

  AddStrikePoints(){
    if( this.frame_counter === 0 || !this.PreviousFrame().isStrike() ){
      return;
    }
    else if( this.PreviousFrame().isStrike() ){
      this.PreviousFrame().frame_score += this.CurrentFrame().frame_score;
    }
  }

  AddSparePoints(){
    if( this.frame_counter === 0 || !this.PreviousFrame().isSpare() ){
      return;
    }
    if( this.PreviousFrame().isSpare() ){
      this.PreviousFrame().frame_score += this.CurrentFrame().roll1;
    }
  }

  UpdatePreviousFrame(){
    this.AddStrikePoints();
    this.AddSparePoints();
  }

  total_score() {
    var total = 0
    this.frames.forEach(function(frame){
      total += frame.frame_score;
    })
    return total;
  }
}
