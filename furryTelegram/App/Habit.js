import {getDate, getDateTime} from './utils' 

/*
* Object: Habit
*/
export default function Habit(name, type, schedule, goal, minimum, goalRange, history) {
    this.habit_name = name;
    //Binary or Continuous
    this.type = type;
    this.history = history;
    //A map of the day of week to time of day the activity has to be complete
    // Value is 'X' if the activity is not scheudled for that day of the week
    this.schedule = constructSchedule(schedule);
    this.goal = goal;
    this.goalRange = goalRange;

    this.devMode = null
    this.devDate = null

    this.updateMode = (mode, date) => {
      this.devMode = mode
      if (mode) {
        this.devDate = date
      }
    }

    this.getSuccessDays = function () {
      currSum = 0.0
      prevDate = null
      successes = {}
      Object.keys(this.history).sort().map((dateTime) => {
        currDate = dateTime.split(" ")[0]
        if (currDate != prevDate && prevDate != null) {
          currSum = 0.0
          prevDate = null
        }
        currSum += this.history[dateTime][1]
        if (currSum >= this.minimum) {
          successes[currDate] = currSum
        }
        if(prevDate == null) {
          prevDate = currDate
        }
      })
      return successes
    }

    this.getProgress = function () {
      today = this.getDate()
      if (this.type == "Continuous") {
        history = this.getSuccessDays()
      }
      else if (this.type == "Binary") {
        history = this.history
      }
      else {
        console.log("Error in getProgress")
      }
      numProgressDays = 0
      today = today.toString().split("/")
      Object.keys(history).map((date, i) => {
        date = date.split("/")
        if (parseFloat(date[2].split(' ')[0]) < parseFloat(today[2]) 
        || (parseFloat(date[2].split(' ')[0]) == parseFloat(today[2]) && parseFloat(date[1]) < parseFloat(today[1])) 
        || (parseFloat(date[2].split(' ')[0]) == parseFloat(today[2]) && parseFloat(date[1]) == parseFloat(today[1]) && parseFloat(date[0]) <= parseFloat(today[0]))) {
          numProgressDays += 1;
        }
      })
      return Math.round(numProgressDays*100.0/this.goal)/100;
    }

    this.updateLog = function (logText, logInterval) {
      this.history[this.getDateTime()] = [logText, parseFloat(logInterval)]
      return this.history
    };

    this.getProgressTowardsMinimum = function () {
      ret = -1
      if (this.type == "Continuous") {
        progressSum = 0.0
        Object.keys(this.history).map((dateTime) => {
          if (dateTime.split(" ")[0] == this.getDate()) {
            progressSum += this.history[dateTime][1]
          }
        })
        ret = progressSum / this.minimum;
      }
      else if (this.type == "Binary") {
        Object.keys(this.history).map((dateTime) => {
          if (dateTime.split(" ")[0] == this.getDate()) {
            ret =  1.0;
          }
        })
      }
      else {
        console.log("Error in getProgressTowardsMinimum")
      }
      return ret
    }

    this.minimum = minimum;

    this.getDate = function () {
      if (this.devMode) {
        return getDate(this.devDate)
      }
      else {
        return getDate(new Date())
      }
    }

    this.getDateTime = function () {
      if (this.devMode) {
        return getDateTime(this.devDate)
      }
      else {
        return getDateTime(new Date())
      }
    }
  };

const DAY_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
function constructSchedule(days) {
  let noSchedule = (Object.keys(days).length == 0);
  let schedule = {}
  DAY_OF_WEEK.map((day, i) => {
    //Assume habit is to be done everyday at anytime
    if (noSchedule) {
      schedule[day] = "Anytime"
    }
    //Else a plan is specified that just blank initialize
    else {
      schedule[day] = "X"
    }
  })
  //If a plan is specified then insert those tasks into the schedule
  if (!noSchedule) {
    Object.keys(days).map((day, i) => {
      schedule[day] = days[day]
    })
  }
  return schedule;
}