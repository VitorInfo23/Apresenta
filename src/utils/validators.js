export const isValidCpf = (cpf) => {
  return cpf && cpf.length === 11 && /^\d+$/.test(cpf);
};

export const isValidTelefone = (telefone) => {
  return telefone && telefone.length === 11 && /^\d+$/.test(telefone);
};

export const isValidHora = (hora) => {
  if (!hora || !/^\d{2}:\d{2}$/.test(hora)) return false;
  
  const [horas, minutos] = hora.split(':').map(Number);
  return horas >= 0 && horas < 24 && minutos >= 0 && minutos < 60;
};