export interface DiagnosticResp {
    id: number;
    modelo_id: number;
    modelo_nombre: string;
    imagen: string;
    datos_complementarios: string; // Representa un objeto JSON como una cadena
    fecha: string;
    resultado: string;
    nombre_usuario: string;
    usuario_id: number;
    usuario_medico_id: number;
    nombre_medico: string;
}
