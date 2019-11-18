

export class Validations {

    existsOrError(value: any, message: string) {
        if (!value) throw message;
        if (Array.isArray(value) && value.length === 0) throw message;
        if (typeof value === 'string' && !value.trim()) throw message;
    }

    notExistsOrError(value: any, message: string) {
        try {
            this.existsOrError(value, message);
        } catch (msg) {
            return;
        }
        throw message
    }

    equalsOrError(valueA: any, valueB: any, message: string) {
        if (valueA !== valueB) throw message;
    }
}