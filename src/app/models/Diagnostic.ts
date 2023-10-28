import { Doctor } from "./Doctor";

export class Diagnostic {
    constructor(
        public doctor?: Doctor,
        public age?: number,
        public weight?: number,
        public height?: number,
        public gender?: number,
        public sectionBody?: number,
        public preconditions?: string,
        public resultDiagnostic?: string,
    ){}

}
