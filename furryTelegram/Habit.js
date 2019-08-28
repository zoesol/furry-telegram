const DAY_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
function constructSchedule(days) {
  let noSchedule = (Object.keys(days).length == 0);
  let schedule = {}
  DAY_OF_WEEK.map((day, i) => {
    //If a plan is specified that just blank initialize
    if (noSchedule) {
      schedule[day] = "Anytime"
    }
    //Else assume habit is to be done everyday at anytime
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

export default function Habit(name, schedule, month_goal) {
    this.habit_name = name;
    this.history = {};
    //A map of the day of week to time of day the activity has to be complete
    // Value is 'X' if the activity is not scheudled for that day of the week
    this.schedule = constructSchedule(schedule);
    this.goal = month_goal;
    //This currently just looks at all log entries for a particular habit
    // In the future could look for different metrics like max weight, num total hours, etc.
    this.getProgress = function () {
      return Math.round(Object.keys(this.history).length*100.0/this.goal)/100;
    }
    this.setHistory = function (logText) {
      //Just uses random numer as key right now
      //In the future make this the current date and time
      this.history[Math.random()] = logText
    }
  };