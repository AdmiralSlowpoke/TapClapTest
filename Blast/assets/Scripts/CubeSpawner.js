// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        CubePrefab: cc.Prefab,
        GridLayout: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        let PhysManager=cc.director.getPhysicsManager();
        PhysManager.enabled=true;
        this.time=0.5;
        this.CubeLine=[];
     },

    start () {
        
    },

     update (dt) {
         /*let a=this.GridLayout.childrenCount;
         if(a<64){
             a++;
             let node=cc.instantiate(this.CubePrefab);
                node.parent=this.GridLayout;
                node.getComponent("CubeColor").setRandomColor();
         }*/
         if(this.node.childrenCount<8){
         //this.time-=0.013;
         this.time-=dt;
         if(this.time<=0){
            this.time=0.5;
            if(this.node.childrenCount<8){
            let node=cc.instantiate(this.CubePrefab);
            node.parent=this.node;
            node.position=new cc.v2(0,0);
            node.getComponent("CubeColor").setRandomColor();
            this.CubeLine.push(node);
            }
        }
    }
            //node.parent=this;
            //node.getComponent("CubeColor").setRandomColor();
     },
});
