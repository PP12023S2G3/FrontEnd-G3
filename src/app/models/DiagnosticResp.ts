export interface DiagnosticResp {
    id: number;
    modelo_id: number;
    modelo_nombre: string;
    imagen: string;
    datos_complementarios: string; // Representa un objeto JSON como una cadena
    fecha: string;
    resultado: string;
    nombre_usuario: string;
    id_usuario: number;
    id_medico: number;
    nombre_medico: string;
}
