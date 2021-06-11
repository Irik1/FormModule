const TxtStyle = require("./txt-style");

class DocumentFields
{
    constructor(name = "",value = "", tableValue = null,
                style = new TxtStyle("Times New Roman",10,0,0,false,0),
                tableValueMaxLen = null, valueMaxLen = 0, type = 1,rowHeight = null) {
        if (name == null)
            this.name = "";
        else this.name = name;
        if (value != null && (valueMaxLen === 0 || value.length <= valueMaxLen))
            this.value = value;
        this.value = value;
        this.tableValue = tableValue;
        this.style = style;
        this.tableValueMaxLen = tableValueMaxLen;
        this.valueMaxLen = valueMaxLen;
        this.type = type;
        this.rowHeight = rowHeight;
    }

    calcRowHeight(){
        let height = 0.0;
        this.rowHeight.forEach(el => height += el);
        return height;
    }

    calcRowHeight(index){
        let height = 0.0;
        this.rowHeight.forEach(el => height += el);
        return height;
    }

    Copy()
    {
        return JSON.parse(JSON.stringify(this));
    }

}
module.exports = DocumentFields;