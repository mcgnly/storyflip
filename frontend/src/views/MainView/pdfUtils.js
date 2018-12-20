import Pdf from "../../services/pdfFactory.js";

export const pdfBySize = function (images, format, madeBy) {
  return new Promise(
    function(resolve, reject) {
      // adding a 'page' of the flipbook, 8 fit on an A4 sheet
      if (format==='A4'){
        Pdf.makeA4pdf();
        startPdf(madeBy);
        images.map((image, index)=>{
          console.log('in the map', index)
          Pdf.addPageToPDFA4(image, index + 2); // +2 because index is 0 and plus a page for the title card
        });
        // Pdf.savePDF();
        resolve();
      } else {
        Pdf.makeA7pdf();
        startPdf(madeBy);
        images.map((image, index)=>{
          Pdf.addPageToPDFA7(image, index + 2); // +2 because index is 0 and plus a page for the title card
        });
        resolve(Pdf.convertToBlob());
      }
    }
  );
}

export function startPdf(madeBy) {
  Pdf.instantiatePDF(madeBy);
}