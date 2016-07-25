(function(){function appConfig(e){e.otherwise("/exercise_5")}function confirmClick(){var e=function(e,t,r,s){var i=r.ngConfirmClick||"Bist du sicher?",n=r.confirmedClick;t.bind("click",function(t){window.confirm(i)&&e.$eval(n)})};return{link:e}}function exceptionDecorator(e){e.decorator("$exceptionHandler",["$delegate","$log",function(e,t){return function(r,s){t.debug("ERROR:"+r),e(r,s)}}])}function exercise5Config(e){e.state("exercise_5",{url:"/exercise_5",controller:"Exercise5Controller as ex5Ctr",templateUrl:"exercise_5/index.html"})}appConfig.$inject=["$urlRouterProvider"],exceptionDecorator.$inject=["$provide"],exercise5Config.$inject=["$stateProvider"],angular.module("ngBoilerplate",["templates","ngAnimate","ui.bootstrap","ngBoilerplate.exercise_5","ui.router.state"]).config(appConfig),angular.module("ngBoilerplate").directive("ngConfirmClick",confirmClick),angular.module("ngBoilerplate").config(exceptionDecorator);var Exercise5Controller=function(){function e(e,t,r){this.$rootScope=e,this.$scope=t,this.Exercise5Service=r,e.pageTitle="Exercise 5",this.text="Greetings, Ex 5!",this.counter=0,this.newStudentName="",this.students=r.getStudents(),this.tipps=["","",""],this.drawsCount="1",this.draws=r.getDraws(),this.correctGuessesTotals=r.getCorrectGuessesTotals(),t.$watch("Exercise5Service.students",function(e,t){this.students=e}),t.$watch("Exercise5Service.draws",function(e,t){this.draws=e}),t.$watch("Exercise5Service.correctGuessesTotals",function(e,t){this.correctGuessesTotals=e})}return e.$inject=["$rootScope","$scope","Exercise5Service"],e.prototype.arrayParseInt=function(e){for(var t=[],r=0;r<e.length;++r)t.push(parseInt(e[r],10));return t},e.prototype.addStudent=function(){if(""===this.newStudentName||null==this.newStudentName)return window.alert("Bitte einen Namen eingeben."),void $("#ex5NewStudentName").parent().hasClass("has-error");$("#ex5NewStudentName").parent().removeClass("has-error");for(var e=!0,t=0;t<3;++t){var r=parseInt(this.tipps[t],10);0===r||isNaN(r)?($("#ex5NewStudentTipp"+(t+1)).parent().addClass("has-error"),e=!1):r<=0?($("#ex5NewStudentTipp"+(t+1)).parent().addClass("has-error"),e=!1):$("#ex5NewStudentTipp"+(t+1)).parent().removeClass("has-error")}if(!e)return void window.alert("Bitte bei den Tipps eine Zahl von 1-5 eingeben.");this.counter+=1;var s=this.arrayParseInt(this.tipps.sort());return s[0]===s[1]||s[0]===s[2]||s[1]===s[2]?void window.alert("Ups, du hast dich wohl vertippt! Eine Zahl kommen doppelt vor!"):(this.Exercise5Service.addStudent(this.newStudentName,s[0],s[1],s[2]),this.newStudentName="",void(this.tipps=["","",""]))},e.prototype.removeStudentWithId=function(e){this.Exercise5Service.removeStudentWithId(e)},e.prototype.deleteDraws=function(){this.Exercise5Service.resetDraws()},e.prototype.newDraw=function(){this.Exercise5Service.newDraw(parseInt(this.drawsCount,10))},e}();angular.module("exercise_5.index",["exercise_5.services"]).controller("Exercise5Controller",Exercise5Controller);var Exercise5Student=function(){function e(e,t,r){this.name=e,this.id=t,this.tipps=r,this.correctGuesses=[0,0,0,0]}return e}(),Exercise5Service=function(){function e(e){this.$rootScope=e,this.studentIDCounter=0,this.students=[],this.draws=[],this.correctGuessesTotals=[0,0,0,0]}return e.$inject=["$rootScope"],e.prototype.getCorrectGuessesTotals=function(){return this.correctGuessesTotals},e.prototype.addStudent=function(e,t,r,s){var i=new Exercise5Student(e,(this.studentIDCounter++),[t,r,s]);this.students.push(i);for(var n=0;n<this.draws.length;++n){var o=this.draws[n],c=this.matchingNumbers(o,i.tipps);this.incrementCorrectMatchForGuesses(c,o),i.correctGuesses[c]++}},e.prototype.getStudents=function(){return this.students},e.prototype.indexOfStudentWithId=function(e){for(var t=0;t<this.students.length;++t)if(this.students[t].id===e)return t;return-1},e.prototype.removeStudentWithId=function(e){for(var t=this.indexOfStudentWithId(e),r=0;this.draws.length;++r){var s=this.matchingNumbers(this.draws[r],this.students[t].tipps);this.decrementCorrectMatchForGuesses(s,this.draws[r])}this.students.splice(t,1)},e.prototype.matchingNumbers=function(e,t){for(var r=0,s=0;s<3;++s){var i=e[s];t.indexOf(i)!==-1&&(r+=1)}return r},e.prototype.incrementCorrectMatchForGuesses=function(e,t){this.correctGuessesTotals[e]++,t[3][e]++},e.prototype.decrementCorrectMatchForGuesses=function(e,t){this.correctGuessesTotals[e]--,t[3][e]--},e.prototype.resetDraws=function(){this.draws.splice(0,this.draws.length);for(var e=0;e<this.students.length;++e)for(var t=this.students[e],r=0;r<4;r++)t.correctGuesses[r]=0;this.$rootScope.$apply()},e.prototype.newDraw=function(e){for(var t=0;t<e;++t){var r=[1,2,3,4,5],s=[r.splice(Math.floor(Math.random()*r.length),1)[0],r.splice(Math.floor(Math.random()*r.length),1)[0],r.splice(Math.floor(Math.random()*r.length),1)[0]].sort();s.push([0,0,0,0]),this.draws.push(s);for(var i=0;i<this.students.length;++i){var n=this.students[i],o=this.matchingNumbers(s,n.tipps);this.incrementCorrectMatchForGuesses(o,s),n.correctGuesses[o]++}}},e.prototype.getDraws=function(){return this.draws},e}();angular.module("exercise_5.services",[]).service("Exercise5Service",Exercise5Service),angular.module("ngBoilerplate.exercise_5",["exercise_5.index","ui.router.state"]).config(exercise5Config);}());