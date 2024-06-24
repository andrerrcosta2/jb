import DomainError from "./domain.error.js";

class DomainNotFoundError extends DomainError {
    constructor(message) {
        super(message, 404); 
        this.name = 'DomainNotFoundError';
      }
}

export default DomainNotFoundError;