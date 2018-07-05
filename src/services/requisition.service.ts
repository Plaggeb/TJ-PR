import { IRequisition } from "../interfaces/requisition.interface";

export class RequisitionService {
    private requisitions: IRequisition[] = [];
    private relGroups: string[] = ['01', 'JP', 'SA', 'US'];
    private item_Text_IDs: any = {
        ITEM_TEXT: 'B01',
        JUSTIFICATION: 'B02',
        REJECT_COMMENTS: 'B03',
        DELIVERY_TEXT: 'B05',
        MATERIAL_PO_TEXT: 'B06'
    };
    
    addItem(item: IRequisition) {
        this.requisitions.push(item);
    }

    addItems(items: IRequisition[]) {
        this.requisitions.push(...items);
    }

    clear() {
        this.requisitions = [];
    }

    getItems() {
        return this.requisitions.slice();
    }

    removeItem(index: number) {
        this.requisitions.splice(index, 1);
    }

    getItemTextIDs() {
        return this.item_Text_IDs;
    }
}