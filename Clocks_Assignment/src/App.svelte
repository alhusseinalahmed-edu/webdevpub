<script>
import { tick } from "svelte";
import { bubble } from "svelte/internal";
import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { linear, bounceOut, circOut, cubicOut, elasticOut, expoOut, quadOut, quartOut, quintOut, sineOut } from 'svelte/easing';
	import { fly} from "svelte/transition";

	let movements = { 'Sweeping': linear, 'Grandfather': bounceOut, 'Modern': elasticOut };
	let movement = 'Sweeping';
	// define and set the initial tweening function
	let sweep = tweened(parseInt((Date.now() / 1000) % 60), {
		duration: 1000,
		easing: movements[movement]
	});

	let time = new Date();
	// for a smooth transition between 59 and 0 seconds
	let start = Date.now() / 1000 - (Date.now() / 1000) % 60

	// these automatically update when `time`
	// changes, because of the `$:` prefix
	$: hours = time.getHours();
	$: minutes = time.getMinutes();
	$: seconds = time.getSeconds();

	/* 
		Apparently, we cannot change the ease on a tweening function using a reactive variable. 
		We need to redefine the entire tweening function.
		This function updates the easing function based on input selection.
		See more here at this Discord thread:
		https://discord.com/channels/457912077277855764/457912077277855766/687411610008158289
		*/
	function changeSweep() {
		sweep = tweened($sweep, {
			duration: 1000,
			easing: movements[movement]
		});

	}

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
			sweep.set(parseInt(Date.now() / 1000 - start));
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
    import { Clock } from "./clock";
    var clock = new Clock(5, 15);
    var alarmTime = 0;
    var isRicardoHidden = true;
    var wakeUpText = "WAKEY WAKEY";
	
	var tempHours = hours;
	var tempMins = minutes;
	var tempSecs = seconds;
    var ricardoImage = "https://media.giphy.com/media/UtcBRO8cxulRzkrVLc/giphy.gif"
    document.body.style.backgroundColor = "#FF8000";
    setInterval(tickClock, 1000);
    function tickClock()
    {
        clock.tick()
        clock = clock;
		tempHours = hours;
		tempMins = minutes;
		tempSecs = seconds;
		if(tempHours >= 0 && tempHours < 10){
			tempHours = "0" + tempHours;
		}
		if(tempMins >= 0 && tempMins < 10){
			tempMins = "0" + tempMins;
		}
		if(tempSecs >= 0 && tempSecs < 10){
			tempSecs = "0" + tempSecs;
		}
		if(tempHours + ":" + tempMins == alarmTime){
			Alarm();
		}
    }
    function setAlarmTime(){
        alarmTime = document.getElementById("alarm-time").value;
        let elements = document.getElementsByClassName("alarm-text");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerText = "Alarm set to" + " " + alarmTime +":00";
        }
		isRicardoHidden = true;
		document.getElementById('clock-face').style.fill = "white";
    }
    function Alarm(){
        let elements = document.getElementsByClassName("alarm-text");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerText = wakeUpText;
        }
        isRicardoHidden = false;
		document.getElementById('clock-face').style.fill = "red";
    }
</script>
<body>
    <div>
        <h1 class = "center"> Digital Clock </h1>
        <h2 id="time-text"class ="center">{tempHours}:{tempMins}:{tempSecs}</h2>
        <label class="center" for="alarm-time">Choose an alarm time: </label>
        <input class="center" id="alarm-time" type="time" name="alarm-time">
        <input id = "alarm-time"class="center" type="button" value ="Set Alarm" on:click={setAlarmTime}>    
        {#if !isRicardoHidden}
        <img id="ricardo"class="center" src={ricardoImage} alt="ricardo">
        {/if}
    </div>
    <div>

    </div>
    <p class="alarm-text">
        Alarm is not triggered
    </p>
    <h1 class = "center"> Analog Clock </h1>
	<svg viewBox='-50 -50 100 100'>

		<circle id='clock-face' r='48'/>
		<!-- markers -->
		{#each [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55] as minute}
		<line
					class='major'
					y1='36'
					y2='45'
					transform='rotate({30 * minute})'
					/>

		{#if minute}
		<g transform='rotate({ (minute / 5 - 6) * 6 * (minute / (minute/5)) })'>
			<text 
						class="clock-text"
						transform='rotate({ ((minute / 5 - 6) * 6 * (minute / (minute/5))) * -1 },0,{ 31 + (1 - (Math.abs((minute/5-6)*6*(minute/(minute/5))) * Math.PI / 180) / Math.PI) })' 
						text-anchor='middle' 
						y='{36 + (Math.abs((minute / 5 - 6) * 6 * ( minute / ( minute / 5))) * Math.PI / 180) / Math.PI - 1}'
						>{minute / 5}
			</text>
		</g>
		{:else}
		<g transform='rotate(-180)'>
			<text 
						class="clock-text"
						transform='rotate(180,0,31)' 
						text-anchor='middle' 
						y='{36 + (Math.abs(180) * Math.PI / 180) / Math.PI - 1}'
						>12
			</text>
		</g>
		{/if}

		{#each [1, 2, 3, 4] as offset}
		<line
					class='minor'
					y1='42'
					y2='45'
					transform='rotate({6 * (minute + offset)})'
					/>
		{/each}
		{/each}

		<!-- hour hand -->
		<line
					class='hour'
					y1='6'
					y2='-28'
					transform='rotate({30 * hours + minutes / 2})'
					/>

		<!-- minute hand -->
		<line
					class='minute'
					y1='6'
					y2='-42'
					transform='rotate({6 * minutes + seconds / 10})'
					/>

		<!-- second hand -->
		<g transform='rotate({6 * $sweep})'>
			<line class='second' y1='10' y2='-36'/>
			<line class='second-counterweight' y1='18' y2='4'/>
		</g>

		<!-- pivot -->
		<circle class='fulcrum' r='1.25' />

	</svg>
        <p class="alarm-text">
        Alarm is not triggered
        </p>
	<div class ="row">
		<div class="rectangle">
			{#key tempHours}<h3 in:fly = {{y: -200}}>
				{tempHours}
			</h3>{/key}
		</div>
		<div class = "rectangle">
			{#key tempMins}<h3 in:fly = {{y: -200}}>
				{tempMins}
			</h3>{/key}
		</div>
		<div class ="rectangle">
			{#key tempSecs}<h3 in:fly = {{y: -200}}>
				{tempSecs}
			</h3>{/key}
		</div>
	</div>

</body>

<style>
    @keyframes rotateAnimation {
  50% {transform: rotate(360deg);}
}
	.row
	{
		display: flex;
		flex-direction: row;
		align-items: center;
		align-content: center;
		justify-content: center;
		overflow:clip;
	}
	h3{
		font-size: auto;
		text-align: center;
		display: block;
	}
	.rectangle {
 		width: 7.5%;
 		height: 3.75%;
 		background: rgb(233, 113, 16);
		text-align: center;
		color: white;
		font-size: 200%;
        font-family: 'Orbitron', sans-serif;
		border: white;
		padding: 10px;
		margin: 10px;
		border-radius: 10px;
		display: block;
		border-top: 6px solid white;
		overflow:clip;
	}
    #ricardo
    {
        padding: 200px;
        margin: auto;
        width: 40%;
        display: block;
        animation: rotateAnimation 5s infinite;
    }
    #time-text
    {
        font-family: 'Orbitron', sans-serif;
        font-size: 50px;
    }
    .alarm-text
    {
        font-size: 35px;
        text-align: center;
    }
    #alarm-time
    {
        background-color: orange;
    }
    .center
    {
        text-align: center;
        margin: auto;
        width: 20%;
        display: block;
    }
    body
    {
        background-color: black;
        color: orange;
        height: 400%
		
    }
    svg {
		width: 100%;
		height: 15%;
        margin-right: 500px;
        display: block;
	}
	.clock-text {
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		font-size: 0.7em;
	}

	#clock-face {
		stroke: #333;
		fill: white;
	}

	.fulcrum {
		fill: rgb(180,0,0);
	}

	.minor {
		stroke: #999;
		stroke-width: 0.5;
	}

	.major {
		stroke: #333;
		stroke-width: 1;
	}

	.hour {
		stroke: #333;
		stroke-linecap: round;
		stroke-width: 1.5;
	}

	.minute {
		stroke: #333;
		stroke-linecap: round;
		stroke-width: 1;
	}

	.second {
		stroke-width: 0.5;
	}

	.second, .second-counterweight {
		stroke: rgb(180,0,0);
	}

	.second-counterweight {
		stroke-width: 2.5;
	}
	</style>
	
<head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet">
</head>