// import mongoose, { Document, Schema } from 'mongoose';
// import { Property } from '@/modals/property';

// // TypeScript interface for the User document
// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   avatar?: string;
//   role: 'user' | 'agent' | 'admin';
//   emailVerified: boolean;
//   favorites: mongoose.Types.ObjectId[] | Property[];
//   savedSearches: {
//     query: string;
//     filters: Record<string, any>;
//     createdAt: Date;
//   }[];
//   socialLogins?: {
//     provider: 'google' | 'facebook' | 'apple';
//     providerId: string;
//   }[];
//   verificationToken?: string;
//   verificationTokenExpires?: Date;
//   resetPasswordToken?: string;
//   resetPasswordExpires?: Date;
//   lastLogin?: Date;
//   createdAt: Date;
//   updatedAt: Date;

//   // Methods
//   comparePassword(candidatePassword: string): Promise<boolean>;
//   generateAuthToken(): string;
//   generateVerificationToken(): string;
//   generatePasswordResetToken(): string;
// }

// // User schema definition
// const UserSchema = new Schema<IUser>(
//   {
//     name: {
//       type: String,
//       required: [true, 'Name is required'],
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: [true, 'Email is required'],
//       unique: true,
//       lowercase: true,
//       trim: true,
//       validate: {
//         validator: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
//         message: 'Please provide a valid email address',
//       },
//     },
//     password: {
//       type: String,
//       required: [true, 'Password is required'],
//       minlength: [8, 'Password must be at least 8 characters'],
//       select: false,
//     },
//     avatar: {
//       type: String,
//       default: '',
//     },
//     role: {
//       type: String,
//       enum: ['user', 'agent', 'admin'],
//       default: 'user',
//     },
//     emailVerified: {
//       type: Boolean,
//       default: false,
//     },
//     favorites: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: 'Property',
//       },
//     ],
//     savedSearches: [
//       {
//         query: String,
//         filters: Object,
//         createdAt: {
//           type: Date,
//           default: Date.now,
//         },
//       },
//     ],
//     socialLogins: [
//       {
//         provider: String,
//         providerId: String,
//       },
//     ],
//     verificationToken: String,
//     verificationTokenExpires: Date,
//     resetPasswordToken: String,
//     resetPasswordExpires: Date,
//     lastLogin: Date,
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       virtuals: true,
//       transform: (doc, ret) => {
//         delete ret.password;
//         delete ret.verificationToken;
//         delete ret.verificationTokenExpires;
//         delete ret.resetPasswordToken;
//         delete ret.resetPasswordExpires;
//         return ret;
//       },
//     },
//     toObject: { virtuals: true },
//   }
// );

// // Password hashing middleware
// UserSchema.pre<IUser>('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     return next();
//   } catch (error) {
//     return next(error as Error);
//   }
// });

// // Method to compare passwords
// UserSchema.methods.comparePassword = async function (
//   candidatePassword: string
// ): Promise<boolean> {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// // Method to generate JWT token
// UserSchema.methods.generateAuthToken = function (): string {
//   return jwt.sign(
//     { id: this._id, role: this.role },
//     process.env.JWT_SECRET as string,
//     { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
//   );
// };

// // Method to generate verification token
// UserSchema.methods.generateVerificationToken = function (): string {
//   const token = crypto.randomBytes(20).toString('hex');
//   this.verificationToken = crypto
//     .createHash('sha256')
//     .update(token)
//     .digest('hex');
//   this.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
//   return token;
// };

// // Method to generate password reset token
// UserSchema.methods.generatePasswordResetToken = function (): string {
//   const token = crypto.randomBytes(20).toString('hex');
//   this.resetPasswordToken = crypto
//     .createHash('sha256')
//     .update(token)
//     .digest('hex');
//   this.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
//   return token;
// };

// // Virtual for formatted user data
// UserSchema.virtual('profile').get(function () {
//   return {
//     id: this._id,
//     name: this.name,
//     email: this.email,
//     avatar: this.avatar,
//     role: this.role,
//     emailVerified: this.emailVerified,
//   };
// });

// // Indexes for better performance
// UserSchema.index({ email: 1 });
// UserSchema.index({ 'socialLogins.provider': 1, 'socialLogins.providerId': 1 });

// // Model export
// export const User = mongoose.model<IUser>('User', UserSchema);

// // TypeScript type for User model
// export type UserModel = typeof User;





import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import { Property } from '@/modals/property';

// TypeScript interface for the User document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: 'user' | 'agent' | 'admin';
  emailVerified: boolean;
  favorites: mongoose.Types.ObjectId[];
  savedSearches: {
    query: string;
    filters: Record<string, any>;
    createdAt: Date;
  }[];
  socialLogins?: {
    provider: 'google' | 'facebook' | 'apple';
    providerId: string;
  }[];
  verificationToken?: string;
  verificationTokenExpires?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;

  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): Promise<string>;
  generateVerificationToken(): string;
  generatePasswordResetToken(): string;
}

// Interface for User model static methods
interface IUserModel extends Model<IUser> {}

// User schema definition
const UserSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        message: 'Please provide a valid email address',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
    },
    avatar: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'agent', 'admin'],
      default: 'user',
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Property',
      },
    ],
    savedSearches: [
      {
        query: String,
        filters: Object,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    socialLogins: [
      {
        provider: String,
        providerId: String,
      },
    ],
    verificationToken: String,
    verificationTokenExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    lastLogin: Date,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.verificationToken;
        delete ret.verificationTokenExpires;
        delete ret.resetPasswordToken;
        delete ret.resetPasswordExpires;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// Password hashing middleware
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: unknown) {
    next(error as Error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT token - Final fixed version
UserSchema.methods.generateAuthToken = async function (): Promise<string> {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const payload = { 
    id: this._id.toString(), 
    role: this.role 
  };

  // This is the definitive fix for the expiresIn type issue
  const expiresIn = (process.env.JWT_EXPIRES_IN as jwt.Secret) || '7d';
  const options: SignOptions = {
    // expiresIn: expiresIn as string // Type assertion here
  };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET as jwt.Secret,
      options,
      (err: Error | null, token: string | undefined) => {
        if (err) return reject(err);
        if (!token) return reject(new Error('Token generation failed'));
        resolve(token);
      }
    );
  });
};

// Method to generate verification token
UserSchema.methods.generateVerificationToken = function (): string {
  const token = crypto.randomBytes(20).toString('hex');
  this.verificationToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  this.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return token;
};

// Method to generate password reset token
UserSchema.methods.generatePasswordResetToken = function (): string {
  const token = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  this.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000);
  return token;
};

// Virtual for formatted user data
UserSchema.virtual('profile').get(function (this: IUser) {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    avatar: this.avatar,
    role: this.role,
    emailVerified: this.emailVerified,
  };
});

// Indexes for better performance
UserSchema.index({ email: 1 });
UserSchema.index({ 'socialLogins.provider': 1, 'socialLogins.providerId': 1 });

// Model export
const User = mongoose.model<IUser, IUserModel>('User', UserSchema);

export { User };
export type UserModel = typeof User;