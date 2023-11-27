import * as Joi from 'joi';

class WaitlistValidator {
  private schema = Joi.object({
    email: Joi.string().email().required(),
  });

  validate(data: Record<string, any>): boolean {
    const { error } = this.schema.validate(data);
    return !error;
  }
}

export default WaitlistValidator;
