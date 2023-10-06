import mongoose from 'mongoose';

export class Validators {
  static get email() {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  }

  static isMongoID(id: string) {
    return mongoose.isValidObjectId(id);
  }
}
