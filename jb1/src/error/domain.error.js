class DomainError extends Error {
    constructor(message, statusCode) {
        super(message); 
        this.name = 'DomainError';
        this.statusCode = statusCode || 500;
      }
}

export default DomainError;