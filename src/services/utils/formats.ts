export const CPF = (cpf: string) => {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length <= 11) {
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    cpf = cpf.replace(/^(\d{2})(\d)/, "$1.$2");
    cpf = cpf.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    cpf = cpf.replace(/\.(\d{3})(\d)/, ".$1/$2");
    cpf = cpf.replace(/(\d{4})(\d)/, "$1-$2");
  }

  return cpf;
};

export const DATE = (date: string) => {
  var year = date.split("-")[0];
  var month = date.split("-")[1];
  var day = date.split("-")[2];

  return day + "/" + ("0" + month).slice(-2) + "/" + ("0" + year).slice(-4);
};

export const TEL = (tel: string) => {
  var tel = tel.replace(/\D/g, "");
  tel = tel.replace(/^0/, "");
  if (tel.length > 10) {
    tel = tel.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (tel.length > 5) {
    tel = tel.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (tel.length > 2) {
    tel = tel.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  } else {
    tel = tel.replace(/^(\d*)/, "($1");
  }
  return tel;
};
