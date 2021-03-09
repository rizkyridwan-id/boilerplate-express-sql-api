import { object, string } from "joiful";
import * as moment from "moment-timezone";

class FormatStringObject {
  format(dataObject: any, ignoreObject: any) {
    if (!Array.isArray(dataObject)) {
      this.doFormat(dataObject, ignoreObject);
    } else {
      dataObject.map((object: any) => {
        this.doFormat(object, ignoreObject);
      })
    }
    
    return dataObject;
  }

  doFormat(dataObject: any, ignoreObject: any) {
    Object.keys(dataObject).map((key, index) => {
      if (typeof dataObject[key] === "string") {
        const resultCek = ignoreObject.find((element: any) => String(element).toUpperCase().trim() === String(key).toUpperCase().trim());
        if (!resultCek) {
          dataObject[key] = String(dataObject[key]).toUpperCase().trim();
        }
      } else if(typeof dataObject[key] === "object") {
        if (!Array.isArray(dataObject[key])) {
          this.doFormat2(dataObject[key], ignoreObject);
        } else {
          dataObject[key].map((object: any) => {
            this.doFormat2(object, ignoreObject);
          })
        }
      }
    });

    return dataObject;
  }

  doFormat2(dataObject: any, ignoreObject: any) {
    Object.keys(dataObject).map((key, index) => {
      if (typeof dataObject[key] === "string") {
        const resultCek = ignoreObject.find((element: any) => String(element).toUpperCase().trim() === String(key).toUpperCase().trim());
        if (!resultCek) {
          dataObject[key] = String(dataObject[key]).toUpperCase().trim();
        }
      }
    });

    return dataObject;
  }
}

export default FormatStringObject;