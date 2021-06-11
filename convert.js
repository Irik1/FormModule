var fs = require('fs');
var path = require('path');
const libre = require('libreoffice-convert');
const temp = require('easy-template-x');
const cov = require('convert-multiple-files');

class ConvertToPDF{
    constructor(documentFields,templatePath, PDFPath, docSavePath, fileName) {
        this.documentFields = documentFields;
        this.templatePath = templatePath;
        this.PDFPath = PDFPath;
        this.docSavePath = docSavePath;
        this.fileName = fileName;
    }

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
            if (el.type)
                data[el.name] = el.value; 
        }, this);
        const handler = new temp.TemplateHandler();
        const doc = await handler.process(templateFile, data);

        fs.writeFileSync(fileNameDoc, doc);
        const pathOutput = await cov.convertWordFiles(fileNameDoc, 'pdf',fileNamePDF);
        fs.unlinkSync(fileNameDoc);
        return [pathOutput,name,filepath];
    }
}
module.exports = ConvertToPDF;