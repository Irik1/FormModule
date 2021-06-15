/** Класс стиля 
 * @class 
*/
class TxtStyle
{
    /**
     * Создать стиль с параметрами
     * @param {string} fontName Название шрифта Time New Romans
     * @param {number} fontSize Размер шрифта
     * @param {number} fontSealing Уплотнение шрифта
     * @param {number} paragraphIndent значение отступа
     * @param {boolean} isMultiline Допустим ли перенос текста в ячейке таблицы
     * @param {number} cellWidth Ширина ячейки таблицы
     */
    constructor(fontName,fontSize,fontSealing,paragraphIndent,isMultiline,cellWidth) {
        this.fontName = fontName;
        this.fontSize = fontSize;
        this.fontSealing = fontSealing;
        this.paragraphIndent = paragraphIndent;
        this.isMultiline = isMultiline;
        this.cellWidth = cellWidth;
    }
}

module.exports = TxtStyle;  