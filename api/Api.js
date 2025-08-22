import { Network } from "./Network";

export default class APIS {
  static SignUp = (data) => {
    return Network("POST", "dealer/register", data, true);
  };

  static signIn = (data) => {
    return Network("POST", "dealer/login", data, true);
  };

  static postLocation = (data) => {
    return Network("PUT", "dealer/location", data);
  };

  static serviceList = () => {
    return Network("GET", "service/list");
  };

  static reqService = (data) => {
    return Network("POST", "request/create", data);
  };

  static categoryList = () => {
    return Network("GET", "category/list");
  };
  
  static categoryType = (id) => {
    return Network("GET", `categorytype/list/${id}`);
  };
  
  static serviceType = (id) => {
    return Network("GET", `issue/listbycategorytype/${id}`);
  };
  
  static serviceData = () => {
    return Network("GET", "request/list");
  };

  static updateProfile = (formData) => {
    return Network("PUT", 'dealer/update/profile', formData)
  }

  static bankdetails = (data) => {
    return Network("POST", 'bankdetails/add', data)
  }
  
}
