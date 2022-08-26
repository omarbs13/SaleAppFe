import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ApiPackageImg } from 'src/environments/environment';
import { MethodsHttpProvider } from '../providers/methodsHttpProviders';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private methodsHttp: MethodsHttpProvider) {}

  exportExcel(fileName: string, data: any) {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, fileName);
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  uploadImg(img: any) {
    let imgParam = new FormData();
    imgParam.append('image', img);
    return this.methodsHttp.httpPostImg(ApiPackageImg, imgParam);
  }
}
