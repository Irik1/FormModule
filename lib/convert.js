//@ts-check

const DocumentFields = require('./document-fields');

var fs = require('fs');
var path = require('path');
const temp = require('easy-template-x');
const cov = require('convert-multiple-files');



/** Класс конвертации в пдф, хранит в себе стили, строки и пути
 * @class
 * @summary Класс конвертации в пдф
 * @since 1.0.0
 * @copyright Все права за @Irik1 и @GnomGad 2021
 */
class ConvertToPDF {
  /**
   * @param {DocumentFields[]} documentFields Объект с полями для заполнения
   * @param {string} templatePath Путь к шаблону docx
   * @param {string} PDFPath Путь сохранения pdf файл
   * @param {string} docSavePath Путь временного хранения файла docx
   * @param {string} fileName Название документа
   */
  constructor(documentFields, templatePath, PDFPath, docSavePath, fileName) {
    this.documentFields = documentFields;
    this.templatePath = templatePath;
    this.PDFPath = PDFPath;
    this.docSavePath = docSavePath;
    this.fileName = fileName;
  }

  /**
   * @summary Заполнение шаблона Word и конвертация его в pdf
   * @description Реализация слишком сложна, возможно стоит упростить и модуль свой юзать
   * @async
   * @function
   * @returns {Promise<string[]>} Путь выходной, имя, путь к пдф
   */
  async FillPDF() {
    let dat = new Date().getTime();
    let name = this.fileName + '_' + dat;
    let fileNameDoc = this.docSavePath + '\\' + name + '.docx';
    // let fileNamePDF = this.PDFPath + '\\' + name + '.pdf';
    let fileNamePDF = this.PDFPath;
    let filepath =  name + '.pdf';
    let data = {};
    const templateFile = fs.readFileSync(this.templatePath);
    this.documentFields.forEach((el) => {
      if (el.type) data[el.name] = el.value;
    }, this);
    const handler = new temp.TemplateHandler();
    const doc = await handler.process(templateFile, data);

    fs.writeFileSync(fileNameDoc, doc);
    const pathOutput = await cov.convert(
      fileNameDoc,
      'pdf',
      'D:\\',
    ).catch((er)=>{
      console.log('er:: '+er);
    });
    fs.unlinkSync(fileNameDoc);
    return [pathOutput, name, filepath];
  }
}

module.exports = ConvertToPDF;