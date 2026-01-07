import Swal from "sweetalert2";

export const swalWithTailwind = Swal.mixin({
  customClass: {
    confirmButton:
      "px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 font-medium mx-2 cursor-pointer",
    cancelButton:
      "px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 font-medium mx-2 cursor-pointer",
  },
  buttonsStyling: false,
});

export const swalSuccess = (title: string) =>
  swalWithTailwind.fire({ title, icon: "success" });

export const swalError = (text: string) =>
  swalWithTailwind.fire({ title: "Error", text, icon: "error" });

export const swalConfirmDelete = () =>
  swalWithTailwind.fire({
    title: "¿Estas seguro de eliminar el registro?",
    text: "No podrás revertir esta acción.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, Eliminar",
    cancelButtonText: "No, Cancelar",
    reverseButtons: true,
  });
