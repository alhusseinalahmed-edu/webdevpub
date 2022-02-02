export class Clock 
{
    constructor()
    {
        this.hour = 0
        this.minute = 0
    }
    tick() {
        this.minute++
        if(this.minute == 60){
            this.hour++
            this.minute = 0
        }
        if(this.hour == 24){
            this.hour = "00";
        }
        if(this.minute < 10){
            this.minute = "0" + this.minute
        }
        if(this.hour.toString().length == 1){
            this.hour = "0" + this.hour;
        }
    }
    get time(){
        return this.hour + ":" + this.minute;
    }
}
