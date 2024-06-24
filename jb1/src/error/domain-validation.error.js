import DomainError from "./domain.error.js";

class DomainValidationError extends DomainError {
    constructor(message) {
        super(message, 400); 
        this.name = 'DomainValidationError';
      }
}

export default DomainValidationError;