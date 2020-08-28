// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Slider: cc.ProgressBar,
        MovesText: cc.Label,
        PointsText: cc.Label,
        PointsToWin:{
            default: 0,
            type: cc.Integer,
            serializable: true,
        },
        NumberOfTurn:{
            default: 0,
            type: cc.Integer,
            serializable: true,
        },
        WinScreen: cc.Node,
        LoseScreen: cc.Node,
        Spawners: [cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.Moves=this.NumberOfTurn;
        this.Points=0;
        this.Slider.progress=0;
        this.fieldFlag=false;
    },

    start () {

    },
    setProgress: function(value){
        this.Slider.progress+=value/this.PointsToWin;
    },
    getProgress: function(){
        return this.Slider.progress;
    },
    setMoves:function(value){
        this.Moves+=value;
        this.MovesText.string=this.Moves;
    },
    getMoves:function(){
        return this.Moves;
    },
    setPoints: function(value){
        this.Points+=value;
        this.PointsText.string=this.Points;
        this.setProgress(value);
    },
    getPoints:function(){
        return this.Points;
    },
    victory:function(){
        this.WinScreen.active=true;
    },
    defeat:function(){
        this.LoseScreen.active=true;
    },
    checkField:function(){//Функция проверки есть ли ходы (не применилась(проблемы с сихронным выполнением функций))
        let array=[];
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                let vect=cc.Vec2;
                vect.x=455-(53*i);
                vect.y=66+(53*j);
                array[i][j]=cc.director.getPhysicsManager().testPoint(vect);
            }
        }
        for(let i=0;i<8;i++){
            for(let j=0;j<8;i++){
                if(array[i][j].node.getComponent("CubeColor").getColorName()==array[i+1][j].node.getComponent("CubeColor").getColorName()
                ||array[i][j].node.getComponent("CubeColor").getColorName()==array[i][j+1].node.getComponent("CubeColor").getColorName())
                {
                    break;
                    //Ходы есть
                }
                else{}
                //Ходов нет, поражение
            }
        }
    },

    //update (dt) {},
});
