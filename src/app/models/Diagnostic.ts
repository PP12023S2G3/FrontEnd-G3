import { Doctor } from "./Doctor";

export class Diagnostic {
    constructor(
        public doctor: Doctor,
        public age: string,
        public weight: string,
        public height: string,
        public gender: string,
        public sectionBody: string,
        public preconditions: string,
        public resultDiagnostic: string,
    ){}

}
