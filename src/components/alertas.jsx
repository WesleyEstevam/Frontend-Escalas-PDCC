import Swal from "sweetalert2";

export function alertaAtualizar() {
  Swal.fire("Bom trabalho!", "Escala atualizada com sucesso!", "success");
}

export function alertaCadastro() {
  Swal.fire("Bom trabalho!", "Escala cadastrada com sucesso!", "success");
}

export function alertaDeletar() {
  Swal.fire({
    title: "Você tem certeza?",
    text: "Você não poderá reverter isso!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Sim",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Escala ecluída com sucesso!.",
        icon: "success",
      });
    }
  });
}

export function erroLogin() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "error",
    title: "Falha ao realizar login",
  });
}
