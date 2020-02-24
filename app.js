
let st = 0;//defining start time to be zero hence intializing it globally
let iob= 3;//I/o bound time in in s
let idel=0;
let tot=0;
let cpu= [];
let k = 0;
/*
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};
*/


function FCFS(arrivalTime, burstTime,IOTime){
  st=0;
  let output = 'P\tAT\tBT\tCT\tTT\tWT\n',
      objCollection = [],
      AT = [],
      BT = [],
      comp,
      tat,
      waiting,
      att = [],
      awt = [],
      IO = [];

      st=arrivalTime[0];
      console.log("initialization or start of process");

  for(var x = 0; x < arrivalTime.length; x++)
    objCollection.push({ A: arrivalTime[x], B: burstTime[x], C: IOTime[x] });


  for(var x = 0; x < objCollection.length; x++){
    //initialix=zing aray with the random values recived 
    AT.push(objCollection[x].A);
    BT.push(objCollection[x].B);
    IO.push(objCollection[x].C);

    //calculation

    console.log("process ",x," in READY state");
    comp = CT(BT[x],IO[x],x);
    
    tat = TT(comp,AT[x]);
    
    waiting = WT(tat,BT[x]);
    
    //storing values in output string, AT and BT array are used.
    output += `${x}\t${AT[x]}\t${BT[x]}\t${comp}\t${tat}\t${waiting}\n`;
    console.log("---------------------------------------------------------------------------------------");
    //pushing to array att and awt for later purposes.
    att.push(tat);
    awt.push(waiting);
  }

  //Passing att and awt arrays to these functions
  output += `Average Turnaround Time: ${averageTT(att, objCollection.length)}\nAverage Waiting Time: ${averageWT(awt, objCollection.length)}`;
  cpu[k]= ((((tot-idel)/tot)*100));
  output+=  `\nCPU Utilization: ${cpu[k]}`;
  k++;
  idel=0;
  tot=0;
  return output;
}


function SJF(arrivalTime, burstTime,IOTime){
  st=0;
  let output = 'P\tAT\tBT\tCT\tTT\tWT\n',
      objCollection = [],
      AT = [],
      BT = [],
      p=[0,1,2,3,4,5,6,7,8,9],
      comp,
      tat,
      waiting,
      att = [],
      awt = [],
      pos,
      //arrivalTimeNew=[0,0,0,0,0,0,0,0,0,0],
      temp1,i,j,
      IO = [];
      
      for(i=0;i<burstTime.length;i++)
    {
        pos=i;
        for(j=i+1;j<burstTime.length;j++)
        {
            if(burstTime[j]<burstTime[pos])
                pos=j;
        }
 
        temp1=burstTime[i];
        burstTime[i]=burstTime[pos];
        burstTime[pos]=temp1;

        temp1=arrivalTime[i];
        arrivalTime[i]=arrivalTime[pos];
        arrivalTime[pos]=temp1;
 
        temp1=p[i];
        p[i]=p[pos];
        p[pos]=temp1;
        
       
    }
    
   st=arrivalTime[0];
    

    console.log("initialization or start of process");
  for(var x = 0; x < 10; x++)
    objCollection.push({ A: arrivalTime[x], B: burstTime[x], C: IOTime[x] });
  

  for(var x = 0; x < objCollection.length; x++){
    //initialix=zing aray with the random values recived 
    AT.push(objCollection[x].A);
    BT.push(objCollection[x].B);
    IO.push(objCollection[x].C);

    //calculation
    
    console.log("process ",p[x]," in READY state");
    comp = CT(BT[x],IO[x],p[x]);
    
    tat = TT(comp,AT[x]);
    
    waiting = WT(tat,BT[x]);
    
    //storing values in output string, AT and BT array are used.
    output += `${p[x]}\t${arrivalTime[x]}\t${burstTime[x]}\t${comp}\t${tat}\t${waiting}\n`;
    console.log("---------------------------------------------------------------------------------------");
    //pushing to array att and awt for later purposes.
    att.push(tat);
    awt.push(waiting);
  }

  //Passing att and awt arrays to these functions
  output += `Average Turnaround Time: ${averageTT(att, objCollection.length)}\nAverage Waiting Time: ${averageWT(awt, objCollection.length)}`;
  cpu[k]= ((((tot-idel)/tot)*100));
  output+=  `\nCPU Utilization: ${cpu[k]}`;
  k++;
  idel=0;
  tot=0;

  return output;
}

function RR(name,arrivalTime, burstTime,quant)
{
  let output = 'P\tAT\tBT\tCT\tWT\n',
  objCollection = [],
  seq = ' ',
  AT = [],
  BT = [],
  comp = [],
  res = 0,
  resc = 0,
  waiting = [],
  t = 0;

for(var x = 0; x < arrivalTime.length; x++)
objCollection.push({ A: arrivalTime[x], B: burstTime[x]});
objCollection.sort(function(a, b){
return a.A - b.A;
});

for(var x = 0; x < objCollection.length; x++){
//initialix=zing aray with the random values recived 
AT.push(objCollection[x].A);
BT.push(objCollection[x].B);
}
//calculation

while (true) { 
  let flag = true; 
  for (var i = 0; i < 10; i++) { 
      if (AT[i] <= t) { 
          if (AT[i] <= quant) { 
              if (BT[i] > 0) { 
                  flag = false; 
                  if (BT[i] > quant) {  
                      t = t + quant; 
                      BT[i] = BT[i] - quant; 
                      AT[i] = AT[i] + quant; 
                      seq += `->` + name[i]; 
                  } 
                  else {  
                      t = t + BT[i]; 
                      comp[i] = t - arrivalTime[i];
                      waiting[i] = t - burstTime[i] - arrivalTime[i]; 
                      BT[i] = 0; 
                      seq += `->` + name[i]; 
                  } 
              } 
          } 
          else if (AT[i] > quant) { 
              for (var j = 0; j < 10; j++) { 
                  if (AT[j] < AT[i]) { 
                      if (BT[j] > 0) {
                           flag = false; 
                          if (BT[j] > quant) { 
                              t = t + quant; 
                              BT[j] = BT[j] - quant; 
                              AT[j] = AT[j] + quant; 
                              seq += `->` + name[j]; 
                          } 
                          else { 
                              t = t + BT[j]; 
                              comp[j] = t - arrivalTime[j]; 
                              waiting[j] = t - burstTime[j] - arrivalTime[j]; 
                              BT[j] = 0; 
                              seq += `->` + name[j]; 
                          } 
                      } 
                  } 
              } 
              if (BT[i] > 0) { 
                  flag = false; 
                  if (BT[i] > quant) { 
                      t = t + quant; 
                      BT[i] = BT[i] - quant; 
                      AT[i] = AT[i] + quant; 
                      seq += `->` + name[i]; 
                  } 
                  else { 
                      t = t + BT[i]; 
                      comp[i] = t - arrivalTime[i]; 
                      waiting[i] = t - burstTime[i] - arrivalTime[i]; 
                      BT[i] = 0; 
                      seq += `->` + name[i]; 
                  } 
              } 
          } 
      } 
      else if (AT[i] > t) { 
          t++; 
          i--; 
      } 
  } 
  if (flag) { 
      break; 
  } 
} 
for(var x = 0; x < 10; x++){
//storing values in output string, AT and BT array are used.
output += `${x}\t${arrivalTime[x]}\t${burstTime[x]}\t${comp[x]}\t${waiting[x]}\n`;
}

for(var i= 0; i<10; i++){

  res = res + waiting[i];
  resc = resc + comp[i];
}
//pushing to array att and awt for later purposes.
output += `Sequence of process ${seq}\n`
//Passing att and awt arrays to these functions
output += `Average Waiting Time: ${(res / 10)}\nAverage Compilation Time: ${(resc/10)}`;
cpu[k] = (((res)/resc)*100);
output+=  `\nCPU Utilization: ${cpu[k]}`;
k++;
return output;
}


//completion time.
function CT(bt,io,x)
{


    console.log("process ",x," EXECUTING");
  if (bt<=io)
  {
    
    st+=bt;
    //console.log("st if= ",st );
    console.log("process ",x," TERMINATED AT ", st);
    return st;
  }
  else
  {
    console.log("Input/Output operation stated for process ",x+1);
    var temp = bt;
   // console.log("process ",x+1," in I/O queue");
    while(temp)
    {
        console.log("process ",x," in I/O queue")
        if (temp>io)
        {
            console.log("process ",x," in I/O channel")
        st =st+io+iob;
        temp = temp-io;
        idel+=(io+iob);
        console.log("process ",x," in READY state");
        console.log("process ",x," EXECUTING at CPU");
        }
        else
        {
        st=st+iob+temp;
        console.log("process ",x," FINAL Execution");
        temp=0;
        }
        
    }
    tot+=st;
    console.log("process ",x," TERMINATED at ",st);
        return st;
  }
 // st += bt;
 // return st;
}

//turnaround time.
function TT(ct, at)
{
  return ct - at;
}

//waiting time.
function WT(tt,bt){
  return tt + bt;
}

function averageTT (ttValues, noOfValues) {
  return ttValues.reduce(function(total, num){
    return total + num;
  }) / noOfValues;
}

function averageWT (wtValues, noOfValues) {
  return wtValues.reduce(function(total, num){
    return total + num;
  }) / noOfValues;
}

let arv=[],bst=[];
for (var i=0; i<10; i++)
{
arv[i] = Math.floor(Math.random() * 120) ;// random value btw 0 to 2 minutes but integer we convert it in "s"
bst[i] = Math.floor(Math.random() * 600) ;//random values btw 0 and 10 minutes but integer we convert it into "s"
}
let process = ["P0","P1","P2","P3","P4","P5","P6","P7","P8","P9"];
//let io=[3,1,2];
//let io=[30,35,40,45,50,55,60,65,70,75];
let io=[30,35,40,45,50,55,60,65,70,75];//initializing input output bount time.
let fcfs = FCFS(arv,bst,io);
let sjf= SJF(arv,bst,io);
let rr1= RR(process,arv,bst,20);
let rr2= RR(process,arv,bst,25);
let rr3= RR(process,arv,bst,30);
let rr4= RR(process,arv,bst,35);
let rr5= RR(process,arv,bst,40);
let algo=["FCFS    ","SJF     ","RR(Q=20)","RR(Q=25)","RR(Q=30)","RR(Q=35)","RR(Q=40)"];
//let rr= RR(arv,bst,io);
console.log("-----------------------------------FCFS----------------------------------------------------");
console.log(fcfs);
//console.log("CPU utilization = ",((tot-idel)/tot)*100);
console.log("-----------------------------------SJF----------------------------------------------------");
console.log(sjf);

//console.log("CPU utilization = ",((tot-idel)/tot)*100);
console.log("------------------------------------RR(20)---------------------------------------------------");
console.log(rr1);//test
console.log("------------------------------------RR(25)---------------------------------------------------");
console.log(rr2);//test
console.log("------------------------------------RR(30)---------------------------------------------------");
console.log(rr3);//test
console.log("------------------------------------RR(35)---------------------------------------------------");
console.log(rr4);//test
console.log("------------------------------------RR(40)---------------------------------------------------");
console.log(rr5);//test
console.log("\n-------CPU utilization comparizon Table-----");
console.log("\nAlgorithm\t\tCPU Utilization");
for(var i=0;i<7;i++)
console.log( `${(algo[i])}\t\t${(cpu[i])}`);
//console.log("CPU utilization = ",((tot-idel)/tot)*100);
//console.log(FCFS([0, 2, 4, 6], [7, 9, 6, 8],[3,5,100,4]));


