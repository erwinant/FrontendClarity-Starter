import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class SwalService {
  constructor() {}

  Toast = Swal.mixin({
    toast: true,
    position: "bottom",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    onOpen: toast => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
  });

  infoMessage(title, text) {
    Swal.fire({ title: title, text: text, icon: "info" });
  }

  warningMessage(title, text) {
    Swal.fire({ title: title, text: text, icon: "warning" });
  }

  errorMessage(title, text) {
    Swal.fire({ title: title, text: text, icon: "error" });
  }

  successMessage(title, text) {
    Swal.fire({ title: title, text: text, icon: "success" });
  }

  promptMessage(title, text) {
    Swal.fire({
      title: title,
      text: text,
      icon: "question",
      showCancelButton: true
    }).then(res => {
      if (res) {
        return true;
      } else {
        return false;
      }
    });
  }

  httpErrorResponse(error) {
    if (error.status == 401) {
    } else {
      Swal.fire({
        title: "Error (" + error.status + ") " + error.statusText,
        text: error.error.error
          ? error.error.error
          : error.error.message
          ? error.error.message
          : error.message,
        icon: "error"
      });
    }
  }
  
  toastInfo(title) {
    this.Toast.fire({
      icon: "info",
      title: title
    });
  }

  toastWarning(title) {
    this.Toast.fire({
      icon: "warning",
      title: title
    });
  }

  toastError(title) {
    this.Toast.fire({
      icon: "error",
      title: title
    });
  }

  toastSuccess(title) {
    this.Toast.fire({
      icon: "success",
      title: title
    });
  }
}
