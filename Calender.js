function event(startTime, endTime, beforeFactor, afterFactor){
	this.startTime = startTime;
	this.endTime = endTime;
	this.div = undefined;
	this.left = 10;
	if(beforeFactor == 0 && afterFactor ==0){
		this.width = 420;
	}
	else if(beforeFactor == 0 && afterFactor != 0){		
		this.width = 420/(afterFactor + 1);
	}
	else if(beforeFactor != 0 && afterFactor == 0){		
		this.width = 420/(beforeFactor + 1);
	}
	else{
		this.width = 420/(beforeFactor + afterFactor);
		this.left = this.left + (this.width * beforeFactor) + 2;
	}

	console.log("beforeFactor:" + beforeFactor  + ": afterFactor:" + afterFactor);
	this.init = function(){
		div = document.createElement("div");
	    div.style.position = "absolute";
	    div.style.left = this.left + "px";
	    div.style.top = this.startTime + "px";  
	    div.style.width = this.width + "px";
	    div.style.height = (endTime - startTime) + "px";
	    div.style.border = 1 + "px";

	    divMargin = document.createElement("p");
	    divMargin.style.position = "float-left";
	    divMargin.style.background = "rgb(0,0,139)";
	    div.appendChild(divMargin);

	    div.innerHTML = div.innerHTML + "<div style=" + "height:"+ (endTime - startTime) + "px" +" background-color: #ECECEC" + "> <p class=" + "item" + "> Sample Item </p> <p class=" + "location" + "> Sample Location </p>";

	    var hue = 'rgb(255,255,255)';
	    div.style.background = hue;

	    var eventDiv = document.getElementById("eventDisplay");

	    eventDiv.appendChild(div);
	    this.div=div;
	}
};

function layOutDay(events){
	//events = sortBy(events);
	events.sort(function(a,b){
		return a.start - b.start;
	});	

	var eventObject;
	var startTime=0;
	var endTime=0;
	var beforeFactor = 0;
	var afterFactor = 0;


	for(var i = 0; i<events.length; i++){
		afterFactor = 0;
		beforeFactor = 0;

		for(var j=i; j<events.length; j++){
			if(j != i){
				if(events[j].start < events[i].end){
					afterFactor++;
				}
			}
		}

		for(var j=0; j<i; j++){
			if(j != i){
				if(events[j].end > events[i].start){
					beforeFactor++;
				}
			}
		}
		eventObject = new event(events[i].start, events[i].end, beforeFactor, afterFactor);
		eventObject.init();
	}

};
