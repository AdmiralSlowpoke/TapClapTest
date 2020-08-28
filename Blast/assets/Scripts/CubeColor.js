// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Color: [cc.SpriteFrame],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.activated=false;
        this.cubesArray=[];
    },

    setActivated: function(a) {
        this.activated=a;
    },
    getActivated: function(){
        return this.activated;
    },

    setRandomColor: function() {
        this.getComponent(cc.Sprite).spriteFrame=this.Color[Math.floor(Math.random()*this.Color.length)];
    },
    pushCubeInArray: function(a){
        this.cubesArray.push(a);
    },
    getColorName: function(){
        switch(this.getComponent(cc.Sprite).spriteFrame.name){
            case "blue_cube":
                return "Blue";
            case "green_cube":
                return "Green";
            case "purple_cube":
                return "Purple";
            case "red_cube":
                return "Red";
            case "yellow_cube":
                return "Yellow";
        }
    },
    checkBlastColor: function(color,firstCube){
        if(color==this.getColorName()){
            let vect2=this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
            let collider=cc.director.getPhysicsManager().testPoint(vect2);
            this.activated=true;
            this.blast(color,vect2,collider,firstCube);
            firstCube.getComponent("CubeColor").pushCubeInArray(collider.node);
        }
        else return false;
    },
    blast: function(color,position,startCollider,firstCube){
        let colliders=[];
        colliders.push(cc.director.getPhysicsManager().testPoint(cc.v2(position.x+53,position.y)));
        colliders.push(cc.director.getPhysicsManager().testPoint(cc.v2(position.x-53,position.y)));
        colliders.push(cc.director.getPhysicsManager().testPoint(cc.v2(position.x,position.y+53)));
        colliders.push(cc.director.getPhysicsManager().testPoint(cc.v2(position.x,position.y-53)));
        for(let i=0;i<4;i++){
            if(colliders[i]!=undefined)
            {
                if(colliders[i]!=startCollider&&colliders[i].getComponent("CubeColor").getActivated()!=true)
                    colliders[i].node.getComponent("CubeColor").checkBlastColor(color,firstCube);
            }
        }
        colliders.length=0;
         
    },
    destroyCube: function(){
        let vect2=this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
        let collider=cc.director.getPhysicsManager().testPoint(vect2);
        this.activated=true;
        this.cubesArray.push(collider.node);
        this.blast(this.getColorName(),vect2,collider,collider.node);
        if(this.cubesArray.length>1){
            let GL=cc.find("Game Logic").getComponent("GameCondition");
            let pointsForBlast=this.cubesArray.length;
            switch(this.getColorName()){
                case "Green":
                    pointsForBlast*=50;
                break;
                    
                case "Blue":
                    pointsForBlast*=55;
                break;
                    
                case "Purple":
                    pointsForBlast*=65;
                break;
                    
                case "Red":
                    pointsForBlast*=70;
                break;

                case "Yellow":
                    pointsForBlast*=80;
                break;
            }
            GL.setPoints(pointsForBlast);
            GL.setMoves(-1);
            if(GL.getProgress()>=1){
                GL.victory();
            }
            else if(GL.getMoves()==0){
                GL.defeat();
            }
            //GL.checkField();
            for(let i=0;i<this.cubesArray.length;i++){
                this.cubesArray[i].destroy();
            } 
        }
        this.activated=false;
        this.cubesArray.length=0;
    },

    start () {

    },

    // update (dt) {},
});
