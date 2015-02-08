
var grade = -1; //current grade
var goal = -1; //grade wanted
var categoryPercent = -1; //Percentage the category points is worth
var finalPoints = -1; //Number of points is final is worth
var categoryPoints = -1; //Number of points in the final category
var finalPercent = -1; //Percentage of CATEGORY the final is worth
var categoryGrade = -1;


function clear() {
    grade = -1;
    goal = -1;
    categoryPercent = -1;
    finalPoints = -1;
    categoryPoints = -1;
    finalPercent = -1;
    categoryGrade = -1;
}

function calculateGrade() {
    if (finalPercent < 0) {
        finalPercent = parseInt(finalPoints) / (parseInt(finalPoints) + parseInt(categoryPoints));
    }
    //alert("Final Percent = " + finalPercent);
    //alert("goal = " + goal + "\ncategoryPercent = " + categoryPercent + "\ngrade = " + grade);
    var categoryGoal = (goal - grade * (1 - categoryPercent)) / categoryPercent; //what is needed in the category the final is in
    //alert("Category grade needed: " + categoryGoal * 100 + "%");
    if (finalPercent < 1) {
        goal = parseFloat(categoryGoal);
        categoryPercent = parseFloat(finalPercent);
        grade = parseFloat(categoryGrade);
        //alert("goal = " + goal + "\ncategoryPercent = " + categoryPercent + "\ngrade = " + grade);
        categoryGoal = (goal - grade * (1 - categoryPercent)) / categoryPercent;
    }
    //alert("Grade needed: " + categoryGoal * 100 + "%");
    publish(categoryGoal);
    location.href = '#resultGradeCalc';
    return categoryGoal;
}

function test() {
    alert("grade = " + grade + "\ngoal = " + goal + "\ncategoryPercent = " + categoryPercent + "\nfinalPoints = " + finalPoints + "\ncategoryPoints = " + categoryPoints + "\nfinalPercent = " + finalPercent + "\ncategoryGrade = " + categoryGrade);
    calculateGrade();
}

function addInputGrade() {
    grade = $('#grade').val() / 100;
    location.href = '#goalGrade2';
}

function addInputGoal() {
    goal = $('#goal').val() / 100;
    location.href = '#categoryPercent3';
}

function addInputCategoryPercent() {
    categoryPercent = $('#categoryPercent').val() / 100;
    if (categoryPercent == 100) {
        location.href = '#categoryPoints4';
    } else {
        location.href = '#finalPercent6';
    }
}

function addInputCategoryPoints() {
    categoryPoints = $('#categoryPoints1').val();
    location.href = '#finalPoints5';
}

function addInputFinalPoints() {
    finalPoints = $('#finalPoints').val();
    calculateGrade();
}

function addInputCategoryGrade() {
    categoryGrade = $('#categoryGrade').val() / 100;
    location.href = '#categoryPoints4';
}

function addInputFinalPercent() {
    if ($('#finalPercent').val() == 1) {
        finalPercent = 1;
        calculateGrade();
    } else if(categoryPercent == 1){
        categoryGrade = grade;
        location.href = '#categoryPoints4';
    } else {
        location.href = '#categoryGrade7';
    }
}

function roundDecimal(num, places) {
    return Math.round(num * Math.pow(10, places)) / (Math.pow(10, places));
}

function passJudgement(i) {
    i *= 100;
    var judgement;
    var j = Math.random();

    if (i > 100) {
        if (j < 0.5)
        {
            judgement = "Good luck bruh.";
        }
        else
        {
            judgement = "Don't show this to your parents...";
        }
    }
    else if (i > 90) {     
        if (j < 0.5)
        {
             judgement = "May the force be with you.";
        }
        else
        {
            judgement = "Spend less time redditing, eh?";
        }
    }
    else if (i > 70) {
             judgement = "Meh. It's do-able.";
    }
    else if (i > 60) {     
        if (j < 0.5)
        {
             judgement = "Pretty safe.";
        }
        else
        {
            judgement = "Nice!!!";
        }
    }
    else if (i > 50) {       
        if (j < 0.5)
        {
             judgement = " 'I dare you to do your test in pen.' - Oliver Dong, Mr.                      President of Lynbrook Science Club Nation, 2015";
        }
        else
        {
            judgement = " 'I dare you to be the first person to turn in your test.                  Establish dominance.' - Jessica Zheng, Advocate for Academic Dominance, 2015";
        }
    }
    else {       
        if (j < 0.5)
        {
             judgement = "Congrats. Now go to r/outside.";
        }
        else
        {
            judgement = "You just did this to show your friends, didn't you?";
        }
    }
    return judgement;
}

function publish(categoryGoal) {
    var ans = document.createElement('div');
    var percentNeeded = roundDecimal(categoryGoal * 100, 4); //apparently doesn't work if 
    
    var v = document.createTextNode(percentNeeded + "%");   
    ans.appendChild(v);
    
    //ans.appendChild(document.createTextNode(passJudgement(categoryGoal)));

    document.getElementById('finalGradeNeeded').appendChild(ans);
    
    var comment = document.createElement('div');
    comment.appendChild(document.createTextNode(passJudgement(categoryGoal)));
    document.getElementById('judge').appendChild(comment);
    //        //used to designate which variable is solved for in a nice string format
    //	var i = findVariable2D(allVarsPerm, inputVars[0][0]);
    //	var whatIsFound = allVarsPerm[i][1];
    //
    //    // publishing starts here
    //
    //    var find = document.createElement('div');
    //    var f = document.createTextNode("You selected to find " + whatIsFound);
    //    find.appendChild(f);
    //    document.getElementById('input-' + (p) + '').appendChild(find);
}