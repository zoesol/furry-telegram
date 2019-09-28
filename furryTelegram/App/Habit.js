import {getDate, getDateTime} from './utils' 

/*
* Object: Habit
*/
export default function Habit(name, type, schedule, goal, minimum, goalRange, history) {
    this.habit_name = name;
    this.type = type;
    this.history = history;
    this.activeDate = new Date()
    this.schedule = constructSchedule(schedule);
    this.goal = goal;
    this.goalRange = goalRange;

    this.getPrevGoalDate = (currDate) => {
      var newDate = new Date(+currDate);
      if (this.goalRange == "Weekly") {
        newDate.setDate(newDate.getDate() - (newDate.getDay() + 6) % 7 - 1);
        if (newDate.getDate() == currDate.getDate()) {
          newDate.setDate(newDate.getDate()-1)
          newDate.setDate(newDate.getDate() - (newDate.getDay() + 6) % 7 - 1);
        }
      }
      else if (this.goalRange == "Monthly") {
        newDate.setDate(0)
      }
      else if (this.goalRange == "Annual") {
        newDate.setMonth(0)
        newDate.setDate(0)
      }
      return newDate
    }

    this.getGoalEndDate = function() {
      goalRange = this.goalRange
      var newDate = new Date(+this.activeDate);
      if (goalRange == "Weekly") {
        newDate.setDate(newDate.getDate() + (7-newDate.getDay()%7+1) - 1)
      }
      else if(goalRange == "Monthly") {
        newDate.setMonth(newDate.getMonth() + 1)
        newDate.setDate(0)
      }
      else if(goalRange == "Annual") {
        newDate.setFullYear(newDate.getFullYear() + 1)
        newDate.setMonth(0)
        newDate.setDate(0)
      }
      return newDate
    }

    this.getGoalHistory = function() {
      goals = {}
      curr = new Date(+this.goalEndDate)
      prev = this.getPrevGoalDate(curr)
      prev.setHours(0)
      sum = 0

      //Assumes history is sorted chronologically
      Object.keys(this.history).reverse().map((date, i) => {
        part = date.split(' ')[0].split("/")
        newDate = new Date(parseInt(part[2]), parseInt(part[1])-1, parseInt(part[0]))
        
        if(prev < newDate) {
          sum += 1
        }
        else if (prev >= newDate) {
          if (sum >= this.goal) {
            goals[new Date(+curr)] = true
          }
          else {
            goal[new Date(+curr)] = false
          }
          sum = 0
          if (newDate.getDate() == prev.getDate()) {
            sum += 1
          }
          curr = new Date(+prev)
          prev = new Date(+this.getPrevGoalDate(curr))
          prev.setHours(0)
        }
      })
      if (sum >= this.goal) {
        goals[new Date(+curr)] = true
      }
      return goals
    }

    this.goalHistory = null

    this.goalEndDate = null


    this.updateMode = (devMode, devDate) => {
      if (devMode) {
        this.activeDate = devDate
        this.goalEndDate = this.getGoalEndDate()
        this.goalHistory = this.getGoalHistory()
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
      return getDate(this.activeDate)
    }

    this.getDateTime = function () {
      return getDateTime(this.activeDate)
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