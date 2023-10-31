import { Doctor } from "./Doctor";

export class Result {
    constructor(
        public doctor?: Doctor,
        public dateOfBirth?: Date,
        public weight?: number,
        public height?: number,
        public gender?: string,
        public sectionBody?: string,
        public preconditions?: string,
        public resultDiagnostic?: string,
        public image?: File
    ){}

}
