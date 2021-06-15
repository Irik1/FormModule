var fs = require("fs");
var path = require("path");
const temp = require("easy-template-x");
const cov = require("convert-multiple-files");
const doc = require("./document-fields");


/** Класс конвертации в пдф, хранит в себе стили, строки и пути
 * @class
 * @summary Класс конвертации в пдф
 * @since 1.0.0
 * @copyright Сделал Олег Рубан 2021
 */
class ConvertToPDF {
  /**
   * @param {doc} documentFields Объект с полями для заполнения
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
   * Заполнение шаблона Word и конвертация его в pdf
   * @async
   * @function
   * @returns {Promise<string[]>} Путь выходной, имя, путь к пдф
   */
  async FillPDF() {
    let dat = new Date().getTime();
    let name = this.fileName + "_" + dat;
    let fileNameDoc = this.docSavePath + "\\" + name + ".docx";
    // let fileNamePDF = this.PDFPath + "\\" + name + ".pdf";
    let fileNamePDF = this.PDFPath;
    let filepath = "\\backend\\pdfconvert\\pdf\\" + name + ".pdf";
    let data = {};
    const templateFile = fs.readFileSync(this.templatePath);
    this.documentFields.forEach((el) => {
      if (el.type) data[el.name] = el.value;
    }, this);
    const handler = new temp.TemplateHandler();
    const doc = await handler.process(templateFile, data);

    fs.writeFileSync(fileNameDoc, doc);
    const pathOutput = await cov.convertWordFiles(
      fileNameDoc,
      "pdf",
      fileNamePDF
    );
    fs.unlinkSync(fileNameDoc);
    return [pathOutput, name, filepath];
  }
}

module.exports = ConvertToPDF;