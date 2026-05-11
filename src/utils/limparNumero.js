export function limparNumero(valor) {
    if (!valor) return '';
    return String(valor).replace(/\D/g, '');
}