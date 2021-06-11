const TxtStyle = require("./txt-style");

/**
 * Класс хранит в себе поля с определенным стилем
 * @class
 */
class DocumentFields
{
    /**
     * Создать массив строк
     * @param {string} name Название поля
     * @param {string} value Значение поля
     * @param {Array} tableValue Таблица значекний
     * @param {TxtStyle} style Стиль элементов
     * @param {Array} tableValueMaxLen Максимальная длина массива
     * @param {number} valueMaxLen Максимальная длина элементов
     * @param {number} type Тип положения 0 - Normal, 1 - Vertical, 2 - Horizontal
     * @param {number} rowHeight Высота строки
     */
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
    /**
     * Старый код, стоит удалить
     * @returns {number} высота
     */
    calcRowHeight(){
        let height = 0.0;
        this.rowHeight.forEach(el => height += el);
        return height;
    }

    /**
     * Старый код, стоит удалить
     * @param {number} index 
     * @returns {number} высота
     */
    calcRowHeight(index){
        let height = 0.0;
        this.rowHeight.forEach(el => height += el);
        return height;
    }

    /**
     * Вернуть объект запаршенный
     * @returns {JSON} возвращает JSON копию объекта
     */
    Copy()
    {
        return JSON.parse(JSON.stringify(this));
    }

}
module.exports = DocumentFields;