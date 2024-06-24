import DomainError from "./domain.error.js";

class DomainBadRequestError extends DomainError {
    constructor(message) {
        super(message, 400); 
        this.name = 'DomainBadRequestError';
      }
}

export default DomainBadRequestError;