const {ccclass, property} = cc._decorator;

@ccclass
export default class RapidItemBase extends cc.Component {

    @property(cc.Node)
    protected layerArray: cc.Node[] = [];

    protected rapidItemData: RapidItemData = null;

    private sizeChangeCallFunc: (index: number, itemSize: cc.Size) => {} = null;
    private itemEventCallFunc: Function = null;

    protected onSizeChange() {
        this.sizeChangeCallFunc && this.sizeChangeCallFunc(this.rapidItemData.index, this.node.getContentSize());
    }

    protected onItemEvent(type: any, data: any) {
        this.itemEventCallFunc && this.itemEventCallFunc(type, data);
    }

    protected onShow(itemData: any) {

    }

    protected onHide() {

    }

    show(rapidItemData: RapidItemData, itemData: any, layerParentArray: cc.Node[], eventCallFunc: Function) {
        // cc.log("Item show data", itemData);

        this.rapidItemData = rapidItemData;
        this.itemEventCallFunc = eventCallFunc;
        this.onShow(itemData);

        for (let i = 0; i < layerParentArray.length; i++) {
            let node = i === 0 ? this.node : this.layerArray[i];
            node.parent = layerParentArray[i];
            node.setPosition(rapidItemData.position);
        }
    }

    hide() {
        for (let i = 1; i < this.layerArray.length; i++) {
            this.layerArray[i].parent = this.node;
        }

        this.sizeChangeCallFunc = null;
        this.itemEventCallFunc = null;
        this.onHide();
    }

    updatePosition(position: cc.Vec2) {
        for (let i = 0; i < this.layerArray.length; i++) {
            let node = i === 0 ? this.node : this.layerArray[i];
            node.setPosition(position);
        }
    }

    getLayerArray(): cc.Node[] {
        return this.layerArray;
    }

    getPostion() {
        this.node.getPosition();
    }

    getIndex(): number {
        return this.rapidItemData.index;
    }

    addListenSizeChange(callFunc: Function) {
        this.sizeChangeCallFunc = callFunc;
    }
}

