export interface IRequisition {
    PREQ_NO: string;
    PREQ_ITEM: string;
    DOC_TYPE: string;
    PUR_GROUP: string;
    CREATED_BY: string;
    PREQ_NAME: string;
    PREQ_DATE: string;
    SHORT_TEXT: string;
    MATERIAL: string;
    PLANT: string;
    STORE_LOC: string;
    TRACKINGNO: string;
    MAT_GRP: string;
    SUPPL_PLNT: string;
    QUANTITY: number;
    UNIT: string;
    DEL_DATCAT: string;
    DELIV_DATE: string;
    REL_DATE: string;
    GR_PR_TIME: string;
    C_AMT_BAPI: number;
    PRICE_UNIT: number;
    ITEM_CAT: string;
    ACCTASSCAT: string;
    DISTRIB: string;
    PART_INV: string;
    GR_IND: string;
    GR_NON_VAL: string;
    IR_IND: string;
    DES_VENDOR: string;
    FIXED_VEND: string;
    PURCH_ORG: string;
    AGREEMENT: string;
    AGMT_ITEM: string;
    INFO_REC: string;
    QUOTA_ARR: string;
    QUOTARRITM: string;
    MRP_CONTR: string;
    BOMEXPL_NO: string;
    LAST_RESUB: string;
    RESUBMIS: number;
    NO_RESUB: number;
    VAL_TYPE: string;
    SPEC_STOCK: string;
    PO_UNIT: string;
    REV_LEV: string;
    PCKG_NO: string;
    KANBAN_IND: string;
    PO_PRICE: string;
    INT_OBJ_NO: string;
    PROMOTION: string;
    BATCH: string;
    VEND_MAT: string;
    ORDERED: number;
    CURRENCY: string;
    MANUF_PROF: string;
    MANU_MAT: string;
    MFR_NO: string;
    MFR_NO_EXT: string;
    DEL_DATCAT_EXT: string,
    CURRENCY_ISO: string;
    ITEM_CAT_EXT: string;
    PREQ_UNIT_ISO: string;
    PO_UNIT_ISO: string;
    GENERAL_RELEASE: string;
    MATERIAL_EXTERNAL: string;
    MATERIAL_GUID: string;
    MATERIAL_VERSION: string;
    PUR_MAT_EXTERNAL: string;
    PUR_MAT_GUID: string;
    PUR_MAT_VERSION: string;
    REQ_BLOCKED: string;
    REASON_BLOCKING: string;
    PROCURING_PLANT: string;
    CMMT_ITEM: string;
    FUNDS_CTR: string;
    RES_DOC: string;
    RES_ITEM: string;
    FUNC_AREA: string;
    GRANT_NBR: string;
    FUND_LONG: string;
    BUDGET_PERIOD: string;
}

export interface IRequisitionExtended {
    PRACCOUNT: [{
        ACTIVITY: string,
        ACTTYPE: string,
        ASSET_NO: string,
        BUDGET_PERIOD: string,
        BUS_AREA: string,
        CMMT_ITEM: string,
        CMT_ITEM_LONG: string,
        COSTCENTER: string,
        COSTOBJECT: string,
        CO_AREA: string,
        CO_BUSPROC: string,
        CREAT_DATE: string,
        DELETE_IND: string,
        DISTR_PERC: number,
        FUNC_AREA: string,
        FUNC_AREA_LONG: string,
        FUND: string,
        FUNDS_CTR: string,
        GL_ACCOUNT: string,
        GRANT_NBR: string,
        ITM_number: string,
        NETWORK: string,
        NET_VALUE: number,
        NOND_ITAX: number,
        ORDERID: string,
        PART_ACCT: string,
        PREQ_ITEM: string,
        PROFIT_CTR: string,
        QUANTITY: string,
        REC_IND: string,
        REF_DATE: string,
        RES_DOC: string,
        RES_ITEM: string,
        RL_EST_KEY: string,
        SCHED_LINE: string,
        SD_DOC: string,
        SERIAL_NO: string,
        SUB_number: string,
        TAXJURCODE: string,
        TAX_CODE: string,
        UNLOAD_PT: string,
        WBS_ELEMENT: string
    }],
    PRHEADER: {
        AUTO_SOURCE: string,
        CREATE_IND: string,
        CTRL_IND: string,
        GENERAL_RELEASE: string,
        HOLD_COMPLETE: string,
        HOLD_UNCOMPLETE: string,
        ITEM_INTVL: string,
        LAST_ITEM: string,
        MEMORY: string,
        MEMORYTYPE: string,
        PARK_COMPLETE: string,
        PARK_UNCOMPLETE: string,
        PREQ_NO: string,
        PR_TYPE: string
    },
    PRHEADERTEXT: [{
        PREQ_ITEM: string,
        PREQ_NO: string,
        TEXT_FORM: string,
        TEXT_ID: string,
        TEXT_LINE: string
    }],
    PRITEM: [{
        ACCTASSCAT: string,
        ADDRESS: string,
        ADDRESS2: string,
        ADVANCE: string,
        AGMT_DOC_CAT: string,
        AGMT_ITEM: string,
        AGREEMENT: string,
        ASSIGNED: string,
        BATCH: string,
        BOMEXPL_NO: string,
        BRAS_NBM: string,
        BUDGET_PERIOD: string,
        CHANGEABLE: string,
        CH_ON: string,
        CLOSED: string,
        CMMT_ITEM: string,
        COMMITMENT: string,
        COM_DATE: string,
        COM_QTY: number,
        CONFIG_ORG: string,
        CONF_MATL: string,
        CONF_MATL_EXTERNAL: string,
        CONF_MATL_GUID: string,
        CONF_MATL_VERSION: string,
        CONSUMPT: string,
        CREATED_BY: string,
        CREATE_IND: string,
        CTRL_IND: string,
        CURRENCY: string,
        CURRENCY_ISO: string,
        CUSTOMER: string,
        DELETE_IND: string,
        DELIV_DATE: string,
        DELIV_TIME: string,
        DEL_DATCAT_EXT: string,
        DES_VENDOR: string,
        DISTRIB: string,
        DOC_CAT: string,
        DOC_TYPE: string,
        EXT_PROC_PROF: string,
        EXT_PROC_REF_DOC: string,
        EXT_PROC_REF_ITEM: string,
        FIXED: string,
        FIXED_VENDOR: string,
        FUNC_AREA: string,
        FUND: string,
        FUNDS_CTR: string,
        FUNDS_RES: string,
        FW_ORDER: string,
        FW_ORDER_ITEM: string,
        GENERAL_RELEASE: string,
        GRANT_NBR: string,
        GR_IND: string,
        GR_NON_VAL: string,
        GR_PR_TIME: string,
        INDUS3: string,
        INFO_REC: string,
        INT_OBJ_NO: string,
        IN_HOUSE: string,
        IR_IND: string,
        ITEM_CAT: string,
        KANBAN_IND: string,
        LANGU: string,
        LANGU_ISO: string,
        LAST_RESUB: string,
        MANU_PROF: string,
        MANU_MAT: string,
        MATERIAL: string,
        MATERIAL_EXTERNAL: string,
        MATERIAL_GUID: string,
        MATERIAL_VERSION: string,
        MATL_CAT: string,
        MATL_GROUP: string,
        MATL_USAGE: string,
        MAT_ORIGIN: string,
        MEMORY: string,
        MFR_NO: string,
        MFR_NO_EXT: string,
        MINREMLIFE: number,
        MRP_AREA: string,
        MRP_CTRLER: string,
        NO_RESUB: number,
        ORDERED: number,
        PART_INV: string,
        PCKG_NO: string,
        PERIOD_IND_EXPIRATION_DATE: string,
        PLANT: string,
        PLND_DELIVERY: string,
        PO_DATE: string,
        PO_ITEM: string,
        PO_number: string,
        PO_PRICE: string,
        PO_UNIT: string,
        PO_UNIT_ISO: string,
        PREQ_DATE: string,
        PREQ_ITEM: string,
        PREQ_NAME: string,
        PREQ_PRICE: number,
        PREQ_UNIT_ISO: string,
        PRICE_UNIT: string,
        PRIO_REQUIREMENT: string,
        PRIO_URGENCY: string,
        PROCSTAT: string,
        PROCURING_PLANT: string,
        PROC_STAT: string,
        PROD_VERSION: string,
        PROMOTION: string,
        PURCH_ORG: string,
        PUR_GROUP: string,
        PUR_MAT: string,
        PUR_MAT_EXTERNAL: string,
        PUR_MAT_GUID: string,
        PUR_MAT_VERSION: string,
        QUANTITY: number,
        QUOTARRITM: string,
        QUOTA_ARR: string,
        REASON_BLOCKING: string,
        REF_REQ: string,
        REF_REQ_ITEM: string,
        REL_DATE: string,
        REL_GROUP: string,
        REL_IND: string,
        REL_STATUS: string,
        REL_STRAT: string,
        REL_VALUE: number,
        REQ_BLOCKED: string,
        REQ_SEGMENT: string,
        RESERV_NO: string,
        RESUBMIS: number,
        RES_ITEM: string,
        REV_LEV: string,
        SC_VENDOR: string,
        SETRESERNO: string,
        SETTLITMNO: string,
        SHEET_NO: string,
        SHORTAGE: number,
        SHORT_TEXT: string,
        SPEC_STOCK: string,
        SPSTCK_PHY: string,
        STK_SEGMENT: string,
        STORE_LOC: string,
        SUBJ_TO_R: string,
        SUPPL_PLNT: string,
        SUPPL_STLOC: string,
        SUPP_VENDOR: string,
        TRACKINGNO: string,
        UNIT: string,
        UOMUSAGE: string,
        VALIDITY_OBJECT: string,
        VALUATION_SPEC_STOCK: string,
        VALUE_ITEM: number,
        VAL_TYPE: string,
        VEND_MAT: string,
        VERSION: string
    }],
    PRITEMTEXT: [{
        PREQ_ITEM: string,
        PREQ_NO: string,
        TEXT_FORM: string,
        TEXT_ID: string,
        TEXT_LINE: string
    }]
}

export interface IREQ_EXT_PRITEM_SINGLE {
    ACCTASSCAT: string,
    ADDRESS: string,
    ADDRESS2: string,
    ADVANCE: string,
    AGMT_DOC_CAT: string,
    AGMT_ITEM: string,
    AGREEMENT: string,
    ASSIGNED: string,
    BATCH: string,
    BOMEXPL_NO: string,
    BRAS_NBM: string,
    BUDGET_PERIOD: string,
    CHANGEABLE: string,
    CH_ON: string,
    CLOSED: string,
    CMMT_ITEM: string,
    COMMITMENT: string,
    COM_DATE: string,
    COM_QTY: number,
    CONFIG_ORG: string,
    CONF_MATL: string,
    CONF_MATL_EXTERNAL: string,
    CONF_MATL_GUID: string,
    CONF_MATL_VERSION: string,
    CONSUMPT: string,
    CREATED_BY: string,
    CREATE_IND: string,
    CTRL_IND: string,
    CURRENCY: string,
    CURRENCY_ISO: string,
    CUSTOMER: string,
    DELETE_IND: string,
    DELIV_DATE: string,
    DELIV_TIME: string,
    DEL_DATCAT_EXT: string,
    DES_VENDOR: string,
    DISTRIB: string,
    DOC_CAT: string,
    DOC_TYPE: string,
    EXT_PROC_PROF: string,
    EXT_PROC_REF_DOC: string,
    EXT_PROC_REF_ITEM: string,
    FIXED: string,
    FIXED_VENDOR: string,
    FUNC_AREA: string,
    FUND: string,
    FUNDS_CTR: string,
    FUNDS_RES: string,
    FW_ORDER: string,
    FW_ORDER_ITEM: string,
    GENERAL_RELEASE: string,
    GRANT_NBR: string,
    GR_IND: string,
    GR_NON_VAL: string,
    GR_PR_TIME: string,
    INDUS3: string,
    INFO_REC: string,
    INT_OBJ_NO: string,
    IN_HOUSE: string,
    IR_IND: string,
    ITEM_CAT: string,
    KANBAN_IND: string,
    LANGU: string,
    LANGU_ISO: string,
    LAST_RESUB: string,
    MANU_PROF: string,
    MANU_MAT: string,
    MATERIAL: string,
    MATERIAL_EXTERNAL: string,
    MATERIAL_GUID: string,
    MATERIAL_VERSION: string,
    MATL_CAT: string,
    MATL_GROUP: string,
    MATL_USAGE: string,
    MAT_ORIGIN: string,
    MEMORY: string,
    MFR_NO: string,
    MFR_NO_EXT: string,
    MINREMLIFE: number,
    MRP_AREA: string,
    MRP_CTRLER: string,
    NO_RESUB: number,
    ORDERED: number,
    PART_INV: string,
    PCKG_NO: string,
    PERIOD_IND_EXPIRATION_DATE: string,
    PLANT: string,
    PLND_DELIVERY: string,
    PO_DATE: string,
    PO_ITEM: string,
    PO_number: string,
    PO_PRICE: string,
    PO_UNIT: string,
    PO_UNIT_ISO: string,
    PREQ_DATE: string,
    PREQ_ITEM: string,
    PREQ_NAME: string,
    PREQ_PRICE: number,
    PREQ_UNIT_ISO: string,
    PRICE_UNIT: string,
    PRIO_REQUIREMENT: string,
    PRIO_URGENCY: string,
    PROCSTAT: string,
    PROCURING_PLANT: string,
    PROC_STAT: string,
    PROD_VERSION: string,
    PROMOTION: string,
    PURCH_ORG: string,
    PUR_GROUP: string,
    PUR_MAT: string,
    PUR_MAT_EXTERNAL: string,
    PUR_MAT_GUID: string,
    PUR_MAT_VERSION: string,
    QUANTITY: number,
    QUOTARRITM: string,
    QUOTA_ARR: string,
    REASON_BLOCKING: string,
    REF_REQ: string,
    REF_REQ_ITEM: string,
    REL_DATE: string,
    REL_GROUP: string,
    REL_IND: string,
    REL_STATUS: string,
    REL_STRAT: string,
    REL_VALUE: number,
    REQ_BLOCKED: string,
    REQ_SEGMENT: string,
    RESERV_NO: string,
    RESUBMIS: number,
    RES_ITEM: string,
    REV_LEV: string,
    SC_VENDOR: string,
    SETRESERNO: string,
    SETTLITMNO: string,
    SHEET_NO: string,
    SHORTAGE: number,
    SHORT_TEXT: string,
    SPEC_STOCK: string,
    SPSTCK_PHY: string,
    STK_SEGMENT: string,
    STORE_LOC: string,
    SUBJ_TO_R: string,
    SUPPL_PLNT: string,
    SUPPL_STLOC: string,
    SUPP_VENDOR: string,
    TRACKINGNO: string,
    UNIT: string,
    UOMUSAGE: string,
    VALIDITY_OBJECT: string,
    VALUATION_SPEC_STOCK: string,
    VALUE_ITEM: number,
    VAL_TYPE: string,
    VEND_MAT: string,
    VERSION: string
}

export interface IREQ_EXT_PRITEMTEXT_SINGLE {
    PREQ_ITEM: string,
    PREQ_NO: string,
    TEXT_FORM: string,
    TEXT_ID: string,
    TEXT_LINE: string
}

export interface IREQ_EXT_PRACCOUT_SINGLE {
    ACTIVITY: string,
    ACTTYPE: string,
    ASSET_NO: string,
    BUDGET_PERIOD: string,
    BUS_AREA: string,
    CMMT_ITEM: string,
    CMT_ITEM_LONG: string,
    COSTCENTER: string,
    COSTOBJECT: string,
    CO_AREA: string,
    CO_BUSPROC: string,
    CREAT_DATE: string,
    DELETE_IND: string,
    DISTR_PERC: number,
    FUNC_AREA: string,
    FUNC_AREA_LONG: string,
    FUND: string,
    FUNDS_CTR: string,
    GL_ACCOUNT: string,
    GRANT_NBR: string,
    ITM_number: string,
    NETWORK: string,
    NET_VALUE: number,
    NOND_ITAX: number,
    ORDERID: string,
    PART_ACCT: string,
    PREQ_ITEM: string,
    PROFIT_CTR: string,
    QUANTITY: string,
    REC_IND: string,
    REF_DATE: string,
    RES_DOC: string,
    RES_ITEM: string,
    RL_EST_KEY: string,
    SCHED_LINE: string,
    SD_DOC: string,
    SERIAL_NO: string,
    SUB_number: string,
    TAXJURCODE: string,
    TAX_CODE: string,
    UNLOAD_PT: string,
    WBS_ELEMENT: string

}