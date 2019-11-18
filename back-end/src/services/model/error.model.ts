import { type } from "os";

export class ErrorResponse {

    message: string;
    code: string;
    severity: string;
    constructor(error: any) {
        if (typeof (error) === 'object') {
            this.message = error.message;
            this.code = error.code;
            this.severity = error.severity;
        }
        if (typeof (error) === 'string') {
            this.message = error;
        }
    }

}