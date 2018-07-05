import { LocalStorageService } from "./localStorage.service";
import { Injectable } from "@angular/core";

@Injectable()
export class SettingsService {
    private storeSAP: boolean = true;
    private approvalCode: string = "";
    private showFieldNames: boolean = true;
    private pushNotification: boolean = false;
    private fontSize: string = 'TEXT-SMALL';
    private displayData = {
        prNumber: true,
        prLine: true,
        description: true,
        requisitioner: true,
        quantity: true,
        amount: true,
        accountAssignment: false,
        itemCategory: false,
        materialNumber: false,
        plant: false,
        desiredVendor: false,
        fixedVendor: false,
        commitmentItem: false,
        fundsCenter: false,
        documentType: false,
        budget: false
    }

    constructor(private lsService: LocalStorageService){
        this.getSettings();
    }

    public getStoreSAP() { return this.storeSAP; }
    public setStoreSAP(storeSAP: boolean) { this.storeSAP = storeSAP; }

    public getDisplayData() { return this.displayData; }
    public setDisplayData(displayData: any) { this.displayData = displayData; }
    
    public getShowFieldNames() { return this.showFieldNames; }

    public getFontSize() { return this.fontSize; }
    public setFontSize(fontSize: string) { this.fontSize = fontSize; }

    public getApproval() { return this.approvalCode; }
    public setApproval(approvalCode: string) { this.approvalCode = approvalCode; }

    public writeSettings() {
        this.lsService.set("FONTSIZE", this.fontSize);
        this.lsService.set("STORESAP", this.storeSAP);
        this.lsService.set("APPROVALCODE", this.approvalCode);
        this.lsService.set("NOTIFICATION", this.pushNotification);
        this.lsService.set("SHOWFIELDNAMES", this.showFieldNames);
        this.lsService.set("DISPLAYDATA", JSON.stringify(this.displayData));
    }

    public getSettings() {
        this.lsService.get("FONTSIZE").then((fontSize: string) => this.fontSize = fontSize).catch(() => this.fontSize="TEXT-SMALL");
        this.lsService.get("STORESAP").then((storeSap: boolean) => this.storeSAP = storeSap).catch(() => this.storeSAP = true);
        this.lsService.get("APPROVALCODE").then((approvalCode: string) => this.approvalCode = approvalCode).catch(() => this.approvalCode = "");
        this.lsService.get("NOTIFICATION").then((pushNotification: boolean) => this.pushNotification = pushNotification).catch(() => this.pushNotification = false);
        this.lsService.get("SHOWFIELDNAMES").then((showFieldNames: boolean) => this.showFieldNames = showFieldNames).catch(() => this.showFieldNames = true);
        this.lsService.get("DISPLAYDATA").then((displayData: string) => this.displayData = JSON.parse(displayData)).catch(() => console.log("No data"));
        console.log(this.displayData);
    }

}